const startupAchievements = [
  { year: '현재', label: '창업지원단 경력', value: '~20년', desc: '교원창업 · 학생창업 · 창업중심대학 프로그램' },
  { year: '연구', label: '박사논문', value: '사례연구', desc: '이공계 창업교원의 역할갈등 — 학문과 현장의 교차' },
  { year: '사업', label: '창업중심대학', value: '프로그램', desc: '정부 지원 창업교육 프로그램 기획·운영' },
];

const sideProjects = [
  {
    title: 'Urban Medica',
    category: '의료관광',
    desc: '외국인 환자 대상 의료관광 서비스. 한국 의료의 접근성을 높이는 플랫폼.',
    status: '진행 중',
  },
  {
    title: '영상 제작/마케팅',
    category: '콘텐츠',
    desc: '브랜드 스토리텔링 영상 제작 및 디지털 마케팅 전략 수립.',
    status: '진행 중',
  },
  {
    title: 'DieNo 블로그',
    category: '플랫폼',
    desc: 'Next.js + Supabase 기반 개인 아카이브. AI와 인간의 협업으로 구축.',
    status: '구축 중',
  },
  {
    title: '외국인 유학생 지원',
    category: '교육',
    desc: '대학 내 외국인 유학생 지원 프로그램 기획 및 운영.',
    status: '진행 중',
  },
];

const investments = [
  { name: 'Mote AI', sector: 'AI', note: '음성 AI 스타트업' },
  { name: 'AuthPay', sector: '핀테크', note: '인증 기반 결제 솔루션' },
  { name: 'Mimetics', sector: '테크', note: '미메틱스' },
  { name: '라봇', sector: '로보틱스', note: '로봇 자동화 스타트업' },
  { name: '포스페이스랩', sector: '스페이스', note: '우주 기술 스타트업' },
  { name: '비노시스', sector: '바이오', note: '바이오/헬스케어' },
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
            20년 창업지원 현장, 사이드 프로젝트, 투자 포트폴리오
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

        {/* 사이드 프로젝트 */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>
              CHAPTER 02
            </span>
            <h2 className="font-headline text-4xl font-bold mt-2" style={{ color: '#012435' }}>
              사이드 프로젝트
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sideProjects.map((project, i) => (
              <div key={i} className="card-lift p-8 rounded-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className="font-label text-[10px] tracking-widest font-bold uppercase"
                      style={{ color: '#7c572d' }}
                    >
                      {project.category}
                    </span>
                    <h3 className="font-headline text-2xl font-bold mt-1" style={{ color: '#012435' }}>
                      {project.title}
                    </h3>
                  </div>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-sm shrink-0"
                    style={{ backgroundColor: '#F4F4F2', color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
                  {project.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 투자 포트폴리오 */}
        <section className="mb-16">
          <div className="mb-10">
            <span className="font-label text-xs tracking-widest font-bold uppercase" style={{ color: '#7c572d' }}>
              CHAPTER 03
            </span>
            <h2 className="font-headline text-4xl font-bold mt-2" style={{ color: '#012435' }}>
              투자 포트폴리오
            </h2>
            <p className="mt-3 text-sm" style={{ color: '#42474c', fontFamily: 'Pretendard, sans-serif' }}>
              * 개인 투자 현황 (세부 내역 비공개)
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {investments.map((inv, i) => (
              <div
                key={i}
                className="card-lift p-6 rounded-sm"
              >
                <p className="font-headline text-xl font-bold mb-1" style={{ color: '#012435' }}>{inv.name}</p>
                <p
                  className="font-label text-[10px] tracking-widest font-bold uppercase mb-2"
                  style={{ color: '#7c572d' }}
                >
                  {inv.sector}
                </p>
                <p className="text-xs" style={{ color: '#72787c', fontFamily: 'Pretendard, sans-serif' }}>{inv.note}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
