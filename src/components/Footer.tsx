import Link from 'next/link';
import VisitCounter from './VisitCounter';

export default function Footer() {
  return (
    <footer className="w-full py-16 px-8 mt-20" style={{ backgroundColor: '#F4F4F2' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* 브랜드 */}
        <div className="space-y-6 max-w-sm">
          <div className="font-headline text-xl font-bold tracking-tighter" style={{ color: '#012435' }}>
            DieNo
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#42474C', fontFamily: 'Pretendard, sans-serif' }}>
            어려움 속에서도 배우고,<br />
            배운 것을 나누며,<br />
            나누면서 성장하는 삶의 기록.<br />
            <span style={{ color: '#7c572d', fontWeight: 600 }}>삶은 소중하다.</span>
          </p>
        </div>

        {/* 링크 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h4
              className="font-bold text-xs tracking-widest uppercase"
              style={{ color: '#012435', fontFamily: 'Inter, sans-serif' }}
            >
              페이지
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: '#42474C', fontFamily: 'Pretendard, sans-serif' }}>
              {[
                ['/blog', '블로그'],
                ['/about', '소개'],
                ['/dream', '꿈'],
                ['/contact', '연락'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors duration-[400ms] hover:text-[#7C572D]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4
              className="font-bold text-xs tracking-widest uppercase"
              style={{ color: '#012435', fontFamily: 'Inter, sans-serif' }}
            >
              카테고리
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: '#42474C', fontFamily: 'Pretendard, sans-serif' }}>
              {[
                ['startup', '창업/스타트업'],
                ['ai_tech', 'AI·테크'],
                ['korea_life', 'Korea Life'],
                ['faith', '신앙·묵상'],
                ['family', '육아·가족'],
                ['learning', '학습·성장'],
                ['sports', 'NBA·스포츠'],
              ].map(([key, label]) => (
                <li key={key}>
                  <Link href={`/blog?category=${key}`} className="transition-colors duration-[400ms] hover:text-[#7C572D]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4
              className="font-bold text-xs tracking-widest uppercase"
              style={{ color: '#012435', fontFamily: 'Inter, sans-serif' }}
            >
              연결
            </h4>
            <div className="flex space-x-4">
              <a href="mailto:soulharbor.dj@gmail.com" className="ink-bleed-hover" style={{ color: '#012435' }}>
                <span className="material-symbols-outlined">mail</span>
              </a>
              <a href="https://www.linkedin.com/in/%EC%84%B1%EC%99%84-%ED%99%8D-5945198b/recent-activity/all/" target="_blank" rel="noopener noreferrer" className="ink-bleed-hover" style={{ color: '#012435' }}>
                <span className="material-symbols-outlined">share</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left"
        style={{ borderTop: '1px solid rgba(194,199,204,0.1)' }}
      >
        <p className="text-sm tracking-wide" style={{ color: '#42474C', fontFamily: 'Pretendard, sans-serif' }}>
          © 2026 DieNo · 다이노. 모든 권리 보유. Built with Scholarly Intent.
        </p>
        <VisitCounter />
      </div>
    </footer>
  );
}
