import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImg from './components/background.jpg';

function Home() {
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 註冊狀態
 // const [regUsername, setRegUsername] = useState('');
 // const [regPassword, setRegPassword] = useState('');
 // const [regEmail, setRegEmail] = useState('');
 // const [regCode, setRegCode] = useState('');
 // const [sentCode, setSentCode] = useState('');
 // const [regErrorMsg, setRegErrorMsg] = useState('');
 // const [regSuccessMsg, setRegSuccessMsg] = useState(''); // ✅ 註冊成功訊息

  // 登入狀態
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [loginSuccessMsg, setLoginSuccessMsg] = useState('');

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
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '20px 50px',
    backgroundColor: 'rgba(255,255,255,0.9)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10
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
    alignItems: 'center',
    padding: '120px 50px 50px'
  };

  const contentStyle = {
    maxWidth: '800px',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: '40px',
    borderRadius: '10px',
    textAlign: 'left'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center'
  };

  // 註冊
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

    // ✅ 顯示註冊成功訊息，不用 alert
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
    }, 2000); // 2 秒後自動跳轉到登入
  };

  // 發送驗證碼
  const sendVerificationCode = () => {
    if (!regEmail) {
      setRegErrorMsg('請輸入 Email');
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);
    alert(`驗證碼已寄送至 ${regEmail}\n(測試用代碼: ${code})`);
  };

  // 登入
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

  // 訪客登入
  const handleGuestLogin = () => {
    setLoginSuccessMsg('以訪客身份登入');
    setShowLoginModal(false);
    navigate('/Visitors');
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <header style={headerStyle}>
        {/* 標題置中 */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: 'bold',
            fontSize: '2.5em',
            color: '#6F4E37',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          AI 履歷健診
        </div>

        {/* 登入/註冊在右上 */}
        <div style={{ marginLeft: 'auto' }}>
          <button style={loginButton} onClick={() => setShowLoginModal(true)}>登入</button>
          
          <button style={registerButton} onClick={() => navigate('/register')}>註冊</button>
        </div>

      </header>

      {/* Main Content */}
      <main style={mainStyle}>
        <div style={contentStyle}>
          <h1>讓履歷脫穎而出吧</h1>
          <p>
            透過 AI 智能分析與 ATS 評分機制，幫助你快速找出履歷不足，
            並提供專業優化建議，提升履歷通過率與面試邀約率。
          </p>
          <ul>
            <li>一鍵檢查，找出履歷弱點</li>
            <li>自動分析履歷內容，找出可改善的地方</li>
            <li>提供技能、格式、結構與風格建議</li>
            <li>支援多語系與多種文件格式 (.pdf/.doc/.docx)</li>
            <li>ATS 關鍵字建議，避免被系統刷掉</li>
          </ul>
        </div>
      </main>



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
            {loginSuccessMsg && (
              <div style={{
                backgroundColor: 'rgba(0, 128, 0, 0.1)',
                color: 'green',
                padding: '10px',
                margin: '20px auto',
                borderRadius: '6px',
                width: 'fit-content',
                fontWeight: 'bold'
              }}>
                {loginSuccessMsg}
              </div>
            )}
            {loginErrorMsg && <p style={{ color: 'red' }}>{loginErrorMsg}</p>}
            <button
              style={{ ...loginButton, width: '50%', marginTop: '10px' }}
              onClick={handleLogin}
            >
              登入
            </button>
            <button
              style={{ ...registerButton, width: '50%', marginTop: '10px' }}
              onClick={handleGuestLogin}
            >
              訪客登入
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
