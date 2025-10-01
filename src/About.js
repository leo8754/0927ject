import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImg from './components/background.jpg';

function About() {
  const navigate = useNavigate();
  const aboutwe = useRef(null);
  const productRef = useRef(null);
  const teamRef = useRef(null);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#333',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 50px',
    backgroundColor: 'rgba(255,255,255,0.9)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10
  };

  const navStyle = {
    display: 'flex',
    gap: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#6F4E37'
  };

  const buttonStyle = {
    padding: '10px 20px',
    marginLeft: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const loginButton = {
    ...buttonStyle,
    backgroundColor: 'white',
    color: '#6F4E37',
    border: '1px solid #6F4E37'
  };

  const registerButton = {
    ...buttonStyle,
    backgroundColor: '#6F4E37',
    color: 'white'
  };

  const mainStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '120px 50px 50px'
  };

  const contentStyle = {
    maxWidth: '850px',
    textAlign: 'left'
  };

  // ===== 統一卡片樣式 =====
  const cardStyle = {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: '20px',
    padding: '30px 35px',
    marginBottom: '25px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    lineHeight: '1.7',
  };

  const cardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
  };

  const teamContainerStyle = {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    marginTop: '20px'
  };

  const teamCardStyle = {
    ...cardStyle,
    flex: '1 1 220px',
    textAlign: 'center',
    minWidth: '200px'
  };

  const teamCardHover = {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
  };

  const footerStyle = {
    marginTop: '30px',
    padding: '25px 0',
    backgroundColor: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontSize: '0.9em',
    color: '#6F4E37',
    borderRadius: '10px',
    boxShadow: '0 -4px 10px rgba(0,0,0,0.05)'
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <div
          style={{ fontWeight: 'bold', fontSize: '2.5em', color: '#6F4E37', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          AI 履歷健診
        </div>

        <nav style={navStyle}>
          <div onClick={() => navigate('/')}>首頁</div>
          <div onClick={() => scrollToRef(aboutwe)}>關於我們</div>
          <div onClick={() => scrollToRef(productRef)}>產品亮點</div>
          <div onClick={() => scrollToRef(teamRef)}>關於團隊</div>
          <div onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
            聯絡我們
          </div>
        </nav>

        <div>
          <button style={loginButton} onClick={() => alert('登入 modal')}>登入</button>
          <button style={registerButton} onClick={() => alert('註冊 modal')}>註冊</button>
        </div>
      </header>

      {/* About 內容 */}
      <main style={mainStyle}>
        <div style={contentStyle}>
          <h2 ref={aboutwe}>關於我們</h2>

          {/* 關於我們單一卡片 */}
          <div
            style={cardStyle}
            onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <p style={{ fontSize: '1.1rem' }}>
              最智慧的AI分析，最專業的履歷健診。
              我們打造數據化、專業化的專業建議，協助求職者精準檢視履歷，
              發揮優勢、改善不足，快速提升競爭力。
            </p>
          </div>

          {/* 產品亮點 */}
          <h2 ref={productRef}>產品亮點</h2>
          {[
            { title: 'AI履歷評分', desc: '即時分析履歷分數，清楚知道優點與缺點' },
            { title: '精準職缺匹配', desc: '依照你的專業背景，自動推薦最適合的工作' },
            { title: '專業優化建議', desc: '提供條列式修改建議，幫你快速改善履歷' },
            { title: '我們的願景', desc: '透過科技與數據，成為專業的AI人才評估平台' }
          ].map((item, idx) => (
            <div
              key={idx}
              style={cardStyle}
              onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, cardStyle)}
            >
              <strong style={{ fontSize: '1.2rem', color: '#000' }}>{item.title}</strong>
              <p style={{ marginTop: '8px', fontSize: '1rem' }}>{item.desc}</p>
            </div>
          ))}

          {/* 關於團隊 */}
          <h2 ref={teamRef}>關於團隊</h2>
          <div style={teamContainerStyle}>
            {[
              { name: 'Leo', role: '前端工程師 / UI設計' },
              { name: 'Vincent', role: '產品經理/後端工程師 / 資料分析' },
              { name: 'Alex', role: 'AI工程師 / 模型開發' },
              { name: 'Michael', role: '整合' }
            ].map((member, idx) => (
              <div
                key={idx}
                style={teamCardStyle}
                onMouseEnter={e => Object.assign(e.currentTarget.style, teamCardHover)}
                onMouseLeave={e => Object.assign(e.currentTarget.style, teamCardStyle)}
              >
                <strong style={{ fontSize: '1.1rem' }}>{member.name}</strong>
                <p style={{ marginTop: '5px', fontSize: '0.95rem' }}>{member.role}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer style={footerStyle}>
            2025 程式驅動 AI 履歷健診團隊 版權所有 | 聯絡我們: contact@airesume.com
          </footer>
        </div>
      </main>
    </div>
  );
}

export default About;
