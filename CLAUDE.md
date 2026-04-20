# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 프로젝트 개요

**DieNo** (dieno.org) — 태그라인: "삶은 소중하다". 두 레포로 구성:
- `dieno-blog/` — Next.js 16 블로그 (`soulharbor-kr/dieno-blog-2026`)
- `dieno-automation/` — Python 자동화 (`soulharbor-kr/dieno-automation`)

두 레포 모두 **Railway**에 배포. master 푸시 시 자동 배포.

## Commands

```bash
npm run dev      # Start dev server (Turbopack, port 3000)
npm run build    # Production build
npm run lint     # ESLint (flat config, v9)
```

No test framework is configured.

## 아키텍처

### 데이터 흐름

모든 데이터 접근은 `src/lib/supabase.ts` 경유 (`getPosts`, `getPostBySlug`, `getRelatedPosts`, `submitContact`, `subscribeNewsletter`). Supabase 미사용 시 `src/lib/mockData.ts`로 폴백.

페이지는 **ISR** `export const revalidate = 3600` 사용 — `getStaticProps`/`getServerSideProps` 아님.

### 페이지 트래킹

`src/components/TrackPageView.tsx` (클라이언트 컴포넌트, pathname 변경 시 `useEffect`) → `POST /api/track`. IP+UA를 SHA-256 해시로 익명화 후 `page_views` 테이블에 저장. `sessionStorage`로 세션 내 중복 방지. 봇 감지는 서버사이드.

### Supabase 테이블

- `posts` — 블로그 콘텐츠 (`src/types/index.ts`의 `Post` 타입 참고)
- `contacts` — 문의 폼 제출
- `newsletter_subscribers` — 이메일 목록, `active` 플래그, conflict 시 upsert
- `page_views` — 분석 (path, hashed visitor_id, user_agent, referer)
- `keywords`, `publish_queue`, `analytics`, `logs` — automation 전용

### 스타일링

Tailwind CSS v4 via `@tailwindcss/postcss`. 디자인 토큰은 CSS 커스텀 프로퍼티로 `src/app/globals.css`에. 카테고리 뱃지는 유틸리티 클래스로 정의 (`badge-startup`, `badge-faith` 등). 폰트: Pretendard (본문/UI), Noto Serif KR (헤드라인), Material Symbols (아이콘) — 모두 루트 레이아웃에서 CDN 로드.

### Path Alias

`@/*` → `./src/*` (`tsconfig.json` 설정)

## 환경변수

```
NEXT_PUBLIC_SUPABASE_URL        # Supabase 프로젝트 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY   # Supabase anon key
ADMIN_PASSWORD                  # GET /api/admin/stats 보호
ANTHROPIC_API_KEY
TAVILY_API_KEY
UNSPLASH_ACCESS_KEY
THREADS_ACCESS_TOKEN
SUPABASE_SERVICE_ROLE_KEY
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER / SMTP_PASS           # Gmail 앱 비밀번호
ALERT_EMAIL=soulharbor.dj@gmail.com
```

## Key Conventions

### 카테고리

`src/types/index.ts`에 고정 union 타입. 카테고리 추가 시 반드시:
1. `Category` 타입 업데이트
2. `CATEGORY_LABELS`, `CATEGORY_COLORS` 업데이트
3. `globals.css` 뱃지 CSS 클래스 추가
4. **Supabase SQL Editor에서 `posts_category_check` 제약조건 수동 업데이트**

허용값: `startup, ai_tech, learning, family, faith, sports, korea_life, skku_ai_edu, skku_ai_startup`

### 포스트 삽입

필수 필드: `title, slug, category, excerpt, content, tags, published, reading_time, cover_image, featured_image_url, created_at`

- `cover_image`에 꺾쇠괄호 `< >` **절대 포함 금지** — 이미지 깨짐 원인
- `featured_image_url`에 `cover_image`와 동일한 값 설정
- URL 예시: `https://images.unsplash.com/photo-xxx?w=800&q=80`
- 스크립트 패턴: `scripts/seed_post_*.py` 복제·수정 후 `py scripts/seed_post_xxx.py` 실행

### 이미지

`images.unoptimized: true` 설정됨 — Railway 서버 IP가 Unsplash CDN에서 차단(403)되어 브라우저가 직접 Unsplash에 요청하도록 우회. 허용 도메인: `images.unsplash.com`, `lh3.googleusercontent.com`.

### ISR 캐시 강제 갱신

DB 수정 후 즉시 반영이 필요하면:
```bash
git commit --allow-empty -m "chore: trigger redeploy"
git push origin master
```

또는 `POST /api/revalidate?secret=<ADMIN_PASSWORD>` 엔드포인트 사용:
```bash
curl -X POST "https://dieno.org/api/revalidate?secret=<ADMIN_PASSWORD>" \
  -H "Content-Type: application/json" \
  -d '{"path": "/blog/slug-here"}'
```

### Threads 게시

`dieno-automation/scripts/share_prism_posts.py`의 `TARGET_SLUGS` 수정 후 실행. 컨테이너 생성 후 반드시 `time.sleep(3)` 후 publish.

## dieno-automation (Python 3.11)

Cron 기반 블로그 자동 생성 파이프라인.

| 파일 | 역할 |
|---|---|
| `scheduler.py` | 파이프라인 오케스트레이션 |
| `modules/keyword_collector.py` | RSS·seed 키워드 수집 |
| `modules/content_generator.py` | Claude API로 본문 생성 → Supabase 저장 |
| `modules/content_reviewer.py` | AI 검수 |
| `modules/sns_distributor.py` | Threads 자동 게시 |

- 현재 모델: `claude-sonnet-4-6`
- CI: `.github/workflows/ci.yml` (ruff + dry-run smoke test)
- 마이그레이션: `database/migrations/*.sql` — **수동 실행 필요**
- scheduler 에러는 stdout이 아닌 알림 이메일로만 전송. 상세 사유는 `logs` 테이블 조회.

## 자주 부딪히는 함정

1. **Next.js 16**: 훈련 데이터와 API·컨벤션 다름. 코드 작성 전 `node_modules/next/dist/docs/` 확인
2. **ISR 1시간 캐시**: DB 수정해도 즉시 반영 안됨. 재배포 트리거 또는 revalidate API 필요
3. **posts_category_check**: 새 카테고리 추가 시 SQL Editor 수동 실행 필수
4. **Windows 로컬 실행**: `py` 런처 사용, 한글 출력은 `sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')`
5. **Threads 게시**: 컨테이너 생성 후 반드시 `time.sleep(3)` 후 publish
6. **블로그 주소**: `dieno.org` (단, Supabase/Railway API는 이 서버에서 403으로 차단됨)
