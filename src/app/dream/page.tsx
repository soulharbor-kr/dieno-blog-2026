const principles = [
  {
    num: '01',
    title: '모든 아이는 가능성이다',
    desc: '발달장애든 영재든, 모든 아이는 고유한 가능성을 품고 있습니다. 비교가 아닌 성장의 관점으로 교육을 바라봅니다.',
  },
  {
    num: '02',
    title: '통합교육의 아름다움',
    desc: '다양한 아이들이 함께 배우는 환경은 모든 이에게 더 풍요로운 성장을 선물합니다. 차이가 약점이 아닌 강점이 되는 공간.',
  },
  {
    num: '03',
    title: '기독교적 세계관',
    desc: '하나님이 창조하신 모든 인간은 존엄합니다. 신앙은 교육의 뿌리이자 방향입니다. 감사와 겸손으로 가르치는 삶.',
  },
  {
    num: '04',
    title: '삶과 연결된 배움',
    desc: '교실 안에서만 일어나는 교육이 아닌, 삶 전체가 배움의 장이 되는 교육. 실패도, 성공도 모두 교육입니다.',
  },
];

export default function DreamPage() {
  return (
    <main className="pt-24">
      {/* 히어로 */}
      <section
        style={{
          background: 'linear-gradient(135deg, #012435 0%, #1b3a4b 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-28 md:py-40">
          <div className="max-w-3xl">
            <span
              className="font-label text-xs tracking-[0.2em] font-semibold uppercase"
              style={{ color: '#D4A574' }}
            >
              THE DREAM
            </span>
            <h1
              className="font-headline text-5xl md:text-7xl font-bold tracking-tight leading-[1.15] mt-4 text-white"
            >
              대안학교<br />
              <span className="italic font-normal" style={{ color: '#D4A574' }}>교장선생님.</span>
            </h1>
            <div className="w-16 h-1 mt-8 mb-8" style={{ backgroundColor: '#D4A574' }} />
            <p className="text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Pretendard, sans-serif' }}>
              첫째 아이의 발달장애 진단을 받던 날,<br />
              이 꿈이 시작되었습니다.<br />
              모든 아이가 함께 성장하는 학교를 만들고 싶습니다.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* 계기 */}
        <section className="py-24 max-w-3xl">
          <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>
            THE ORIGIN
          </span>
          <h2 className="font-headline text-4xl font-bold mt-2 mb-8" style={{ color: '#012435' }}>
            꿈의 시작
          </h2>
          <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
            <p>
              첫째 아이가 발달장애 진단을 받던 날을 아직도 기억합니다.
              교육행정을 공부했고, 대학에서 창업교육을 20년 가까이 해왔지만,
              내 아이 앞에서는 아무것도 몰랐습니다.
            </p>
            <p>
              그날부터 통합교육을 새로운 눈으로 바라보기 시작했습니다.
              교육행정 박사 과정에서 배운 것들이 이론이 아닌 삶이 되었습니다.
            </p>
            <p>
              언젠가, 발달장애 아이와 비장애 아이가 함께 배우고 성장하는 대안학교를 세우겠다는
              꿈을 품게 되었습니다.
            </p>
          </div>
        </section>

        {/* 교육 철학 */}
        <section style={{ backgroundColor: '#f4f4f2', margin: '0 -100vw', padding: '0 100vw' }}>
          <div className="max-w-7xl mx-auto py-24">
            <div className="mb-12">
              <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>
                PHILOSOPHY
              </span>
              <h2 className="font-headline text-4xl font-bold mt-2" style={{ color: '#012435' }}>
                교육 철학
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {principles.map((p) => (
                <div key={p.num} className="card-lift p-8 rounded-sm space-y-4">
                  <span
                    className="font-headline text-5xl font-bold block"
                    style={{ color: 'rgba(1,36,53,0.1)' }}
                  >
                    {p.num}
                  </span>
                  <h3 className="font-headline text-2xl font-bold" style={{ color: '#012435' }}>
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 비전 */}
        <section className="py-24 max-w-3xl">
          <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>
            THE VISION
          </span>
          <h2 className="font-headline text-4xl font-bold mt-2 mb-10" style={{ color: '#012435' }}>
            통합교육 비전
          </h2>
          <div className="space-y-8">
            {[
              {
                icon: '🏫',
                title: '작지만 깊은 학교',
                desc: '규모보다 깊이를 추구합니다. 선생님과 학생이 이름을 알고, 이야기를 나누는 학교.',
              },
              {
                icon: '🌱',
                title: '느린 학습자를 위한 공간',
                desc: '빠른 아이만을 위한 교육이 아닌, 각자의 속도를 존중하는 배움의 환경.',
              },
              {
                icon: '✝️',
                title: '신앙 위에 세운 교육',
                desc: '기독교적 세계관을 바탕으로, 모든 생명의 존엄함을 교육의 출발점으로 삼는 학교.',
              },
              {
                icon: '🤝',
                title: '지역사회와 함께',
                desc: '학교 담장 너머로 지역사회, 기업, 가정이 함께 아이를 키우는 교육 생태계.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-6 items-start">
                <span className="text-3xl shrink-0 mt-1">{item.icon}</span>
                <div>
                  <h3 className="font-headline text-xl font-bold mb-2" style={{ color: '#012435' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 인용 */}
        <section className="pb-24">
          <blockquote
            className="font-headline text-2xl md:text-3xl italic text-center max-w-3xl mx-auto"
            style={{ color: '#012435' }}
          >
            <span style={{ color: '#7c572d', fontSize: '3rem', lineHeight: 0 }}>&ldquo;</span>
            <p className="mt-4">
              모든 아이는 하나님의 형상으로 만들어졌습니다.<br />
              그 아이의 고유한 빛을 발견하는 것이 교육입니다.
            </p>
            <span style={{ color: '#7c572d', fontSize: '3rem', lineHeight: 0 }}>&rdquo;</span>
          </blockquote>
        </section>
      </div>
    </main>
  );
}
