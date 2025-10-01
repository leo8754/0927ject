import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImg from './components/background.jpg';

function Home() {
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // ===== 註冊狀態 =====
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCode, setRegCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [regErrorMsg, setRegErrorMsg] = useState('');
  const [regSuccessMsg, setRegSuccessMsg] = useState('');

  // ===== 登入狀態 =====
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [loginSuccessMsg, setLoginSuccessMsg] = useState('');

  // ===== Style =====
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

  const cardStyle = {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: '15px',
    padding: '25px 30px',
    margin: '30px auto',
    maxWidth: '700px',
    textAlign: 'left',
    boxShadow: '0 6px 15px rgba(255,255,255,0.25)',
    backdropFilter: 'blur(6px)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    lineHeight: '1.6'
  };

  const cardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(255,255,255,0.25)'
  };

  const listCardStyle = {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: '12px',
    padding: '12px 15px',
    margin: '10px 0',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(4px)',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  };

  const listCardHover = {
    transform: 'scale(1.02)',
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: '30px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center',
    backdropFilter: 'blur(6px)'
  };

  const footerStyle = {
    padding: '20px 0',
    backgroundColor: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
    fontSize: '0.9em',
    color: '#6F4E37',
    borderRadius: '10px',
    boxShadow: '0 -4px 10px rgba(255,255,255,0.3)',
    backdropFilter: 'blur(6px)',
    marginTop: 'auto'
  };

  // ===== 註冊功能 =====
  const handleRegister = () => {
    if (!regUsername || !regPassword || !regEmail || !regCode) {
      setRegErrorMsg('請完整填寫所有欄位');
      return;
    }
    if (regCode !== sentCode) {
      setRegErrorMsg('驗證碼錯誤');
      return;
    }
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    if (users.some(user => user.username === regUsername)) {
      setRegErrorMsg('此使用者已註冊');
      return;
    }
    users.push({ username: regUsername, password: regPassword, email: regEmail });
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    setRegSuccessMsg('註冊成功！即將跳轉到登入頁面...');
    setTimeout(() => {
      setShowRegisterModal(false);
      setShowLoginModal(true);
      setRegUsername('');
      setRegPassword('');
      setRegEmail('');
      setRegCode('');
      setRegErrorMsg('');
      setRegSuccessMsg('');
    }, 2000);
  };

  const sendVerificationCode = () => {
    if (!regEmail) {
      setRegErrorMsg('請輸入 Email');
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);
    alert(`驗證碼已寄送至 ${regEmail}\n(測試用代碼: ${code})`);
  };

  // ===== 登入功能 =====
  const handleLogin = () => {
    if (!loginUsername || !loginPassword) {
      setLoginErrorMsg('請輸入使用者名稱與密碼');
      return;
    }
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const user = users.find(
      user => user.username === loginUsername && user.password === loginPassword
    );
    if (user) {
      localStorage.setItem('username', loginUsername);
      setLoginSuccessMsg(`登入成功！歡迎 ${loginUsername}`);
      setShowLoginModal(false);
      setLoginUsername('');
      setLoginPassword('');
      setLoginErrorMsg('');
      navigate('/first');
    } else {
      setLoginErrorMsg('使用者名稱或密碼錯誤');
    }
  };

  const handleGuestLogin = () => {
    setLoginSuccessMsg('以訪客身份登入');
    setShowLoginModal(false);
    navigate('/Visitors');
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
          <div onClick={() => navigate('/about')}>關於我們</div>
          <div onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>服務項目</div>
          <div onClick={() => document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' })}>最新消息</div>
          <div onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>聯絡我們</div>
        </nav>

        <div>
          <button style={loginButton} onClick={() => setShowLoginModal(true)}>登入</button>
          <button style={registerButton} onClick={() => setShowRegisterModal(true)}>註冊</button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, paddingTop: '120px' }}>
        {/* Hero */}
        <section style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          margin: '40px auto',
          maxWidth: '720px'
        }}>
          <h1 style={{ fontSize: '3rem', color: '#6F4E37' }}>讓你的履歷在眾人中脫穎而出</h1>
          <p style={{ fontSize: '1.5rem', marginTop: '20px' }}>
            AI 智能幫你快速分析履歷，提供專屬優化建議，提升面試成功率
          </p>
        </section>

        {/* 簡介 */}
        <section
          style={cardStyle}
          onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
          onMouseLeave={e => Object.assign(e.currentTarget.style, { transform: 'translateY(0)', boxShadow: '0 6px 15px rgba(0,0,0,0.1)' })}
        >
          <h2 style={{ fontSize: '1.5rem', color: '#6F4E37', marginBottom: '15px' }}>簡介</h2>
          <p>
            我們致力於打造最智能的履歷健診平台，結合人工智慧，
            幫助使用者快速掌握履歷優缺點，提升錄取機率。
          </p>
        </section>

        {/* 服務項目 */}
        <section
          id="services"
          style={cardStyle}
          onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
          onMouseLeave={e => Object.assign(e.currentTarget.style, { transform: 'translateY(0)', boxShadow: '0 6px 15px #6F4E37' })}
        >
          <h2 style={{ color: '#6F4E37' }}>服務項目</h2>  {/* 改標題顏色 */}
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {['填寫個人基本資料表單', '填寫人格特質表單', '上傳履歷（支援 PDF 與 Word）', '利用 AI 分析履歷優缺點與改進建議'].map((item, idx) => (
              <li key={idx} 
                  style={listCardStyle}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, listCardHover)}
                  onMouseLeave={e => Object.assign(e.currentTarget.style, listCardStyle)}>
                📌 {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 最新消息 */}
        <section
          id="news"
          style={cardStyle}
          onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
          onMouseLeave={e => Object.assign(e.currentTarget.style, { transform: 'translateY(0)', boxShadow: '0 6px 15px #6F4E37' })}
        >
          
          <h2 style={{ color: '#6F4E37' }}>最新消息</h2>  {/* 改標題顏色 */}
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {['優化 AI 履歷分析報告呈現方式', 'AI 履歷分析功能精準度提升'].map((news, idx) => (
              <li key={idx} style={listCardStyle}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, listCardHover)}
                  onMouseLeave={e => Object.assign(e.currentTarget.style, listCardStyle)}>
                📝 {news}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2 style={{ color: '#6F4E37' }}>準備好讓履歷升級了嗎？</h2>
          <button
            style={{ ...registerButton, fontSize: '1.5rem', padding: '15px 40px', marginTop: '20px' }}
            onClick={() => setShowRegisterModal(true)}
          >
            立即註冊 ➜
          </button>
        </section>
      </div>

      {/* Register Modal */}
      {showRegisterModal && (
        <div style={modalOverlayStyle} onClick={() => setShowRegisterModal(false)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <h2>註冊</h2>
            <input
              type="text"
              placeholder="使用者名稱"
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
              style={{ width: '80%', padding: '8px', margin: '10px 0' }}
            />
            <input
              type="password"
              placeholder="密碼"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              style={{ width: '80%', padding: '8px', margin: '10px 0' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              style={{ width: '80%', padding: '8px', margin: '10px 0' }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
              <input
                type="text"
                placeholder="驗證碼"
                value={regCode}
                onChange={(e) => setRegCode(e.target.value)}
                style={{ width: '50%', padding: '8px', marginRight: '10px' }}
              />
              <button onClick={sendVerificationCode} style={{ ...registerButton, padding: '8px 12px' }}>
                發送驗證碼
              </button>
            </div>
            {regErrorMsg && <p style={{ color: 'red' }}>{regErrorMsg}</p>}
            {regSuccessMsg && <p style={{ color: 'green', fontWeight: 'bold' }}>{regSuccessMsg}</p>}
            <button style={{ ...registerButton, width: '50%', marginTop: '10px' }} onClick={handleRegister}>
              提交
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div style={modalOverlayStyle} onClick={() => setShowLoginModal(false)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <h2>登入</h2>
            <input
              type="text"
              placeholder="使用者名稱"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              style={{ width: '80%', padding: '8px', margin: '10px 0' }}
            />
            <input
              type="password"
              placeholder="密碼"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={{ width: '80%', padding: '8px', margin: '10px 0' }}
            />
            {loginErrorMsg && <p style={{ color: 'red' }}>{loginErrorMsg}</p>}
            {loginSuccessMsg && (
              <div style={{ backgroundColor: 'rgba(0, 128, 0, 0.1)', color: 'green', padding: '10px', margin: '10px auto', borderRadius: '6px', width: 'fit-content', fontWeight: 'bold' }}>
                {loginSuccessMsg}
              </div>
            )}
            <button style={{ ...loginButton, width: '50%', marginTop: '10px' }} onClick={handleLogin}>登入</button>
            <button style={{ ...registerButton, width: '50%', marginTop: '10px' }} onClick={handleGuestLogin}>訪客登入</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" style={footerStyle}>
        2025 程式驅動 AI 履歷健診團隊 版權所有 | 聯絡我們: contact@airesume.com
      </footer>
    </div>
  );
}

export default Home;
