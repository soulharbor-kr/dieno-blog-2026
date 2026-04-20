const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('환경변수가 없습니다.');
  process.exit(1);
}

const post = {
  title: 'AI 잘 쓰고 있다고 생각했는데, 막상 물어보니 모르겠더라고요',
  slug: 'prism-ai-literacy-test',
  excerpt: 'ChatGPT를 2년 넘게 매일 쓰는데, "AI 잘 써요?"라는 질문 앞에서 멈칫했습니다. "많이 쓰는 것"과 "잘 쓰는 것"은 다릅니다. 내 AI 활용력을 6개 차원으로 측정하는 PRISM-AI를 소개합니다.',
  content: `ChatGPT 쓴 지 벌써 2년이 넘었습니다.

매일 씁니다. 보고서도 쓰고, 코드도 짜고, 아이디어도 뽑고.

그런데 어느 날 동료가 물었습니다.

"AI 잘 써요?"

순간 멈칫했습니다. "뭐, 그냥… 쓰죠." 말은 그렇게 했는데, 사실 확신이 없었습니다. 내가 AI를 잘 쓰는 건지, 아니면 그냥 많이 쓰는 건지.

## "많이 쓰는 것"과 "잘 쓰는 것"은 다릅니다

AI 사용 경험이 쌓일수록 오히려 이 질문이 더 선명해집니다.

- 프롬프트를 길게 쓰면 결과가 더 좋아지는 건 알겠는데, 왜 그런지는 모른다
- AI가 틀린 정보를 자신 있게 말할 수 있다는 건 알지만, 매번 확인하진 않는다
- 업무에 AI를 붙여 봤는데, 어떤 도구를 언제 쓸지는 여전히 감으로 결정한다
- 저작권이나 개인정보 문제, 솔직히 생각해 본 적 없다

이게 나만의 이야기가 아닐 겁니다.

## AI 리터러시를 측정하는 도구가 없었던 이유

시중에도 "AI 리터러시 테스트"는 있습니다. 그런데 대부분 지식 퀴즈입니다. LLM이 무엇인지, 파인튜닝이 무엇인지 묻는 문제들. 정작 "나는 AI를 얼마나 효과적으로, 책임 있게, 지속적으로 쓰고 있는가"는 재지 않습니다.

그래서 만들었습니다. **PRISM-AI**.

## PRISM-AI는 이렇게 측정합니다

AI 활용력을 **6개 차원**으로 나눕니다.

**역량 4축** — 지금 무엇을 할 줄 아는가

| 축 | 의미 |
|---|---|
| U · AI 이해도 | LLM 원리와 한계를 이해하는가 |
| P · 프롬프팅 역량 | 원하는 결과를 정확히 뽑아내는가 |
| V · 비판적 검증 | AI 결과를 의심하고 확인하는가 |
| E · 윤리·책임 사용 | 안전하고 책임 있게 쓰는가 |

**성장 2축** — 얼마나 써 왔고, 앞으로 얼마나 더 배울 것인가

| 축 | 의미 |
|---|---|
| X · 실전 적용 경험 | 실제 업무와 생활에 얼마나 녹여냈는가 |
| L · 학습 의지 | 새 도구와 변화를 계속 탐색하는가 |

36개 문항, 약 10분. 5점 척도로 솔직하게 답하면 됩니다.

## 결과로 무엇을 받나요

6축 레이더 차트로 내 강점과 성장 가능성이 큰 영역을 한눈에 확인합니다.

그리고 **7가지 AI 활용 페르소나** 중 나에게 맞는 하나를 받습니다.

> "프롬프트 장인 — 지시의 예술가인 당신, 이제 검증과 실전 적용까지 확장할 때입니다."

> "호기심 학습자 — 배움의 엔진이 달린 당신, 꾸준한 습관이 실력을 만들어 갈 거예요."

점수가 낮다고 해서 "부족하다"는 말을 쓰지 않습니다. 낮은 점수는 그냥 **성장 가능성이 가장 큰 영역**입니다. 각 차원마다 "다음 한 걸음"을 구체적으로 제안해 드립니다. 판정이 아니라 경로를 보여주는 것, PRISM-AI가 만들어진 이유입니다.

## 개인정보 걱정 없이

이름도, 이메일도 필요 없습니다. 접속 IP는 즉시 해싱되어 저장되고 7일 후 자동으로 삭제됩니다. 광고·추적 SDK는 전혀 없습니다. 완전 익명, 완전 무료, 오픈소스입니다.

---

AI 시대에 "나는 어디쯤 있는가"를 한번 정직하게 들여다볼 기회.

지금 바로 시작해 보세요. 10분이면 충분합니다.

[→ PRISM-AI 진단 시작하기](https://prism-ai-production-43ae.up.railway.app/assess)`,
  category: 'ai_tech',
  tags: ['AI리터러시', 'PRISM-AI', '프롬프팅', 'AI활용', '자기진단'],
  cover_image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
  featured_image_url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
  published: true,
  reading_time: 4,
};

const res = await fetch(`${supabaseUrl}/rest/v1/posts`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': serviceRoleKey,
    'Authorization': `Bearer ${serviceRoleKey}`,
    'Prefer': 'return=representation',
    'Origin': supabaseUrl,
  },
  body: JSON.stringify(post),
});

if (!res.ok) {
  const err = await res.text();
  console.error('삽입 실패:', err);
  process.exit(1);
}

const data = await res.json();
console.log('포스팅 완료!');
console.log('URL: /blog/' + data[0].slug);
