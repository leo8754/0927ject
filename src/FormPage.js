import React, { useState, useEffect } from 'react';
import bgImg from './components/background.jpg';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // ---------------- 讀取登入者 ----------------
  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    if (savedUser) setUsername(savedUser);
  }, []);

  // ---------------- 登出 ----------------
  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const footerStyle = {
    marginTop: 'auto',
    padding: '20px 0',
    backgroundColor: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontSize: '0.9em',
    color: '#6F4E37',
    width: '100%',
    boxSizing: 'border-box'
  };

  // 頭像顏色
  const avatarColor = '#6F4E37';

  return (
    <div style={{
      fontFamily: '"Microsoft JhengHei", sans-serif',
      color: '#000',
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>

      {/* Header */}
      <div style={{
        position:'fixed',
        top:0,
        left:0,
        width:'100%',
        background:'rgba(255,255,255,0.85)',
        padding:'20px 40px',
        boxShadow:'0 2px 8px rgba(0,0,0,0.1)',
        zIndex:100,
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
        <h1 style={{ margin:0, color:'#8B4513', fontWeight:'700', fontSize:'2.5rem' }}>AI 履歷健診</h1>

        {/* 右上角頭像 + 狀態 + 回首頁按鈕 */}
        <div style={{ position: 'absolute',
          top: '20px',
          right: '80px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px' }}>
          {/* 頭像 */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: avatarColor,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {username ? username.charAt(0).toUpperCase() : "?"}
          </div>

          {/* 狀態文字 */}
          <div style={{ textAlign:'left' }}>
            <div style={{ fontWeight:'600' }}>{username}</div>
            <div style={{ fontSize:'0.9rem', color:'green' }}><b>狀態：在線</b></div>
          </div>

          {/* 回首頁按鈕 */}
          <button onClick={handleLogout} style={btnStyle}>登出</button>
        </div>
      </div>

      {/* 主要內容區容器 */}
      <div style={{ flex: 1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:'180px', gap:'30px', padding:'0 30px', boxSizing:'border-box' }}>

        {/* 卡片化說明框 + 表單按鈕 */}
        <div style={{
          maxWidth:'600px',
          padding:'30px 35px',
          background:'#fff',
          borderRadius:'16px',
          boxShadow:'0 8px 20px rgba(0,0,0,0.15)',
          textAlign:'center',
          color:'#333',
          fontSize:'1rem',
          lineHeight:'1.6',
          border:'1px solid #e0e0e0'
        }}>
          <p style={{ marginBottom:'25px' }}>
            填寫個人資料有助於 AI 履歷分析更精準地提供建議，並提高職缺推薦的個人化效果。
          </p>
          <div style={{ display:'flex', justifyContent:'center' }}>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSc3Jp5mdLOuPknXWUjViggAnl70cP0F03xBAsQh8hmTZPcRVA/viewform?usp=header" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button style={formBtnStyle}>填寫基本個人資料</button>
            </a>
          </div>
        </div>

        {/* 頁面導航按鈕 */}
        <div style={{ display:'flex', gap:'30px' }}>
          <button onClick={()=>navigate('/first')} style={navBtnStyle}>← 上一步</button>
          <button onClick={()=>navigate('/FormPage1')} style={navBtnStyle}>下一步 →</button>
        </div>
      </div>

      {/* Footer */}
      <footer style={footerStyle}>
        2025 程式驅動 AI 履歷健診團隊 版權所有 | 聯絡我們: contact@airesume.com
      </footer>
    </div>
  );
}

// 登出按鈕
const btnStyle = {
  padding:'8px 16px',
  background:'#dc3545',
  color:'#fff',
  border:'none',
  borderRadius:'6px',
  cursor:'pointer'
};

// Google 表單按鈕
const formBtnStyle = {
  padding:'14px 32px',
  background:'#6F4E37',
  color:'#fff',
  border:'none',
  borderRadius:'10px',
  cursor:'pointer',
  fontSize:'1.1rem',
  fontWeight:'600',
  boxShadow:'0 4px 10px rgba(0,123,255,0.3)',
  transition:'all 0.3s ease'
};

// 導航按鈕
const navBtnStyle = {
  padding:'10px 20px',
  background:'#6F4E37',
  color:'#fff',
  border:'none',
  borderRadius:'8px',
  cursor:'pointer'
};
