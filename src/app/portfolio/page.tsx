const startupAchievements = [
  { year: '현재', label: '창업지원단 경력', value: '~20년', desc: '교원창업 · 학생창업 · 창업중심대학 프로그램' },
  { year: '연구', label: '박사논문', value: '사례연구', desc: '이공계 창업교원의 역할갈등 — 학문과 현장의 교차' },
  { year: '사업', label: '창업중심대학', value: '프로그램', desc: '정부 지원 창업교육 프로그램 기획·운영' },
];

export default function PortfolioPage() {
  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        {/* 헤더 */}
        <div className="mb-20 space-y-3">
          <span
            className="font-label text-xs tracking-[0.2em] font-semibold uppercase"
            style={{ color: '#7c572d' }}
          >
            THE ARCHIVE
          </span>
          <h1
            className="font-headline text-5xl md:text-6xl font-bold tracking-tight"
            style={{ color: '#012435' }}
          >
            포트폴리오
          </h1>
          <p className="text-lg" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
            창업지원 성과
          </p>
        </div>

        {/* 창업지원 성과 */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>
              CHAPTER 01
            </span>
            <h2 className="font-headline text-4xl font-bold mt-2" style={{ color: '#012435' }}>
              대학 창업지원 성과
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {startupAchievements.map((item, i) => (
              <div key={i} className="card-lift p-8 rounded-sm space-y-4">
                <span
                  className="font-label text-xs tracking-widest font-bold uppercase"
                  style={{ color: '#7c572d' }}
                >
                  {item.year}
                </span>
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>{item.label}</p>
                  <p className="font-headline text-3xl font-bold" style={{ color: '#012435' }}>{item.value}</p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
