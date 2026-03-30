import Link from 'next/link';

const timeline = [
  { period: '학부', title: '경제학 + 통계학', org: '학문의 시작', desc: '숫자로 세상을 읽는 법, 데이터가 거짓말하지 않음을 배우다' },
  { period: 'MBA', title: '경영학 석사', org: '이론과 현장의 교차', desc: '창업 현장에서 일하면서 MBA는 필수적 선택이었다' },
  { period: '박사', title: '교육행정 박사', org: '학문과 실전의 교차점', desc: '학문과 실전, 두 세계의 긴장을 연구로 풀어내다' },
  { period: '현재', title: '대학 창업지원', org: '다년간 현장 경력', desc: '교원창업 · 학생창업 · 창업중심대학 프로그램 운영' },
  { period: '미래', title: '대안학교 교장', org: 'The Dream', desc: '발달장애 포함 통합교육 비전 — 삶은 소중하다' },
];

const values = [
  { icon: '🙏', en: 'Gratitude', ko: '감사', desc: '부상과 고통이 가르쳐준 일상의 소중함' },
  { icon: '🌿', en: 'Humility', ko: '겸손', desc: '경험에서 우러나온 진정한 낮아짐' },
  { icon: '📚', en: 'Learning', ko: '학습', desc: '평생 배우는 삶, 끊임없는 성장' },
  { icon: '🤝', en: 'Sharing', ko: '나눔', desc: '배운 것을 아낌없이 나누는 삶' },
  { icon: '✝️', en: 'Faith', ko: '신앙', desc: '기독교 신앙 — 감사와 겸손의 원천' },
  { icon: '👨‍👩‍👦', en: 'Family', ko: '가족', desc: '가족, 삶의 가장 큰 이유' },
];

export default function AboutPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-28">
        <div className="max-w-3xl space-y-6">
          <span
            className="font-label text-xs tracking-[0.2em] font-semibold uppercase"
            style={{ color: '#7c572d' }}
          >
            THE ARCHIVIST
          </span>
          <h1
            className="font-headline text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
            style={{ color: '#012435' }}
          >
            다이노.
          </h1>
          <div className="w-16 h-1" style={{ backgroundColor: '#7c572d' }} />
          <p
            className="font-body text-xl leading-relaxed max-w-2xl"
            style={{ color: '#42474c' }}
          >
            어려움 속에서도 배우고, 배운 것을 나누며, 나누면서 성장하는 삶의 기록.
            가족을 사랑하는 기독교인, 교육과 창업의 접점에서 일하는 평생학습자.
          </p>
        </div>
      </section>

      {/* Quote */}
      <section style={{ backgroundColor: '#f4f4f2' }} className="py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <p
            className="font-headline text-3xl md:text-4xl italic leading-relaxed"
            style={{ color: '#012435' }}
          >
            &ldquo;어려움 속에서도 배우고, 배운 것을 나누며,<br />나누면서 성장하는 삶의 기록&rdquo;
          </p>
          <div className="mt-8 w-12 h-0.5 mx-auto" style={{ backgroundColor: '#7c572d' }} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Timeline */}
        <section className="py-20">
          <div className="mb-12">
            <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>
              JOURNEY
            </span>
            <h2 className="font-headline text-4xl font-bold mt-2" style={{ color: '#012435' }}>
              학문과 커리어 여정
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl">
            {timeline.map((item, i) => (
              <div key={i} className="grid grid-cols-[80px_1fr] gap-8 items-start">
                <div className="text-right">
                  <span
                    className="font-label text-xs font-bold tracking-wider uppercase"
                    style={{ color: '#7c572d' }}
                  >
                    {item.period}
                  </span>
                </div>
                <div
                  className="p-6 rounded-sm"
                  style={{ backgroundColor: '#F4F4F2' }}
                >
                  <h3 className="font-headline text-xl font-bold mb-1" style={{ color: '#012435' }}>
                    {item.title}
                  </h3>
                  <p className="font-label text-xs tracking-wide uppercase mb-3" style={{ color: '#7c572d' }}>
                    {item.org}
                  </p>
                  <p className="font-body text-sm" style={{ color: '#42474c' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trauma & Growth */}
        <section className="py-12 max-w-3xl">
          <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>
            TURNING POINT
          </span>
          <h2 className="font-headline text-4xl font-bold mt-2 mb-8" style={{ color: '#012435' }}>
            20대 후반의 부상과 성장
          </h2>
          <div className="space-y-5 font-body text-lg leading-relaxed" style={{ color: '#42474c' }}>
            <p>
              20대 후반, 운동 중 큰 부상을 당했습니다. 그 사건은 저를 완전히 바꿔놓았습니다.
              젊고 무적이라 믿었던 저에게 부상은 일상의 소중함을 가르쳐주었고,
              겸손과 감사라는 삶의 태도를 선물했습니다.
            </p>
            <p>
              그 경험이 지금의 DieNo를 만들었습니다.
              &ldquo;삶은 소중하다&rdquo; — 이 단순한 진리가 모든 것의 출발점입니다.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>
            CORE VALUES
          </span>
          <h2 className="font-headline text-4xl font-bold mt-2 mb-10" style={{ color: '#012435' }}>
            핵심 가치
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.en} className="card-lift p-8 rounded-sm space-y-3">
                <span className="text-3xl block">{v.icon}</span>
                <div>
                  <p className="font-label text-xs tracking-widest uppercase font-bold" style={{ color: '#7c572d' }}>
                    {v.en}
                  </p>
                  <p className="font-headline text-xl font-bold" style={{ color: '#012435' }}>{v.ko}</p>
                </div>
                <p className="font-body text-sm" style={{ color: '#42474c' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Family */}
        <section className="py-16 max-w-3xl">
          <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>
            FAMILY
          </span>
          <h2 className="font-headline text-4xl font-bold mt-2 mb-10" style={{ color: '#012435' }}>
            가족 소개
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: '💑', label: '배우자', desc: '사랑스럽고 든든한 인생 파트너' },
              { icon: '👦', label: '첫째', desc: '착하고 똑똑한, 함께 성장하고 있는 아이' },
              { icon: '👦', label: '둘째', desc: '흥이 넘치는 에너자이저' },
              { icon: '👶', label: '셋째', desc: '알파벳을 사랑하는 귀여운 막내' },
            ].map((member) => (
              <div key={member.label} className="card-lift p-6 rounded-sm flex gap-4 items-start">
                <span className="text-2xl">{member.icon}</span>
                <div>
                  <p className="font-headline text-base font-bold mb-1" style={{ color: '#012435' }}>{member.label}</p>
                  <p className="font-body text-sm" style={{ color: '#42474c' }}>{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section className="py-12 mb-8">
          <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>
            INTERESTS
          </span>
          <h2 className="font-headline text-4xl font-bold mt-2 mb-8" style={{ color: '#012435' }}>
            관심 분야
          </h2>
          <div className="flex flex-wrap gap-3">
            {['창업/스타트업', 'AI 활용', 'AX', '유통/물류', '재테크', '기독교', '역사', 'NBA/레이커스', '농구', '패델 테니스', '의료관광', '영상 제작/마케팅'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-sm text-sm font-medium font-body"
                style={{ backgroundColor: '#F4F4F2', color: '#42474C' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="pb-20 flex flex-wrap gap-6">
          <Link
            href="/dream"
            className="px-8 py-4 rounded-sm font-semibold transition-all duration-[400ms] hover:bg-[#1b3a4b]"
            style={{ backgroundColor: '#012435', color: 'white' }}
          >
            나의 꿈 보기
          </Link>
          <Link
            href="/contact"
            className="font-semibold pb-1 hover:text-[#7c572d] transition-all duration-[400ms] self-center"
            style={{ color: '#012435', borderBottom: '2px solid #7c572d' }}
          >
            연락하기
          </Link>
        </div>
      </div>
    </main>
  );
}
