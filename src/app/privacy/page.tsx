export default function PrivacyPage() {
  return (
    <main className="pt-24">
      <section className="max-w-3xl mx-auto px-6 sm:px-8 py-20">
        <span
          className="font-label text-xs tracking-[0.2em] font-semibold uppercase"
          style={{ color: '#7c572d' }}
        >
          PRIVACY POLICY
        </span>
        <h1
          className="font-headline text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mt-4 mb-8"
          style={{ color: '#012435' }}
        >
          개인정보처리방침
        </h1>
        <div className="w-16 h-1 mb-12" style={{ backgroundColor: '#7c572d' }} />

        <div className="font-body text-lg leading-relaxed space-y-8" style={{ color: '#42474c' }}>
          <p>
            DieNo (이하 &ldquo;본 사이트&rdquo;)는 이용자의 개인정보를 중요시하며,
            개인정보보호법 등 관련 법령을 준수합니다.
          </p>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-3" style={{ color: '#012435' }}>
              1. 수집하는 개인정보
            </h2>
            <p>
              본 사이트는 별도의 회원가입 없이 운영되며, 이용자의 개인정보를 직접 수집하지 않습니다.
              다만, 웹사이트 방문 시 쿠키 및 접속 로그가 자동으로 생성될 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-3" style={{ color: '#012435' }}>
              2. 개인정보의 이용 목적
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>웹사이트 이용 통계 분석</li>
              <li>서비스 개선 및 사용자 경험 향상</li>
            </ul>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-3" style={{ color: '#012435' }}>
              3. 제3자 서비스
            </h2>
            <p>
              본 사이트는 다음과 같은 제3자 서비스를 이용할 수 있으며, 각 서비스의 개인정보처리방침이 적용됩니다.
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Google Analytics (방문 통계)</li>
              <li>Meta / Instagram / Threads (SNS 연동)</li>
              <li>Supabase (데이터 저장)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-3" style={{ color: '#012435' }}>
              4. 개인정보의 보유 및 파기
            </h2>
            <p>
              자동 수집된 로그 정보는 수집일로부터 1년 이내에 파기합니다.
              이용자가 삭제를 요청할 경우 즉시 처리합니다.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-3" style={{ color: '#012435' }}>
              5. 이용자의 권리
            </h2>
            <p>
              이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제를 요청할 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-3" style={{ color: '#012435' }}>
              6. 연락처
            </h2>
            <p>
              개인정보 관련 문의는 아래로 연락해 주세요.
            </p>
            <p className="mt-2 font-semibold">
              이메일: contact@dieno.org
            </p>
          </div>

          <p className="text-sm" style={{ color: '#8a9199' }}>
            본 방침은 2026년 4월 4일부터 시행됩니다.
          </p>
        </div>
      </section>
    </main>
  );
}
