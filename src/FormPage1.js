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

  return (
    <div style={{
      fontFamily: '"Microsoft JhengHei", sans-serif',
      color: '#000',
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      padding: '30px',
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
        <div style={{ display:'flex', alignItems:'center', gap:'16px', marginRight: '40px' }}>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontWeight:'600' }}>使用者：{username}</div>
            <div style={{ fontSize:'0.9rem', color:'green' }}>狀態：在線</div>
          </div>
          <button onClick={handleLogout} style={btnStyle}>登出</button>
        </div>
      </div>

      {/* 中央內容區 */}
      <div style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'180px',
        gap:'20px'
      }}>
        {/* Google 表單按鈕 */}
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdEm7T4s4tEQl1t2EXpqMsqquuT-RkxhP6mWaEB-y3N_C8VoA/viewform" target="_blank" rel="noopener noreferrer">
          <button style={formBtnStyle}>填寫人格特質表單</button>
        </a>
        
        {/* 頁面導航按鈕 */}
        <div style={{ display:'flex', gap:'30px', marginTop:'30px' }}>
          <button onClick={()=>navigate('/FormPage')} style={navBtnStyle}>← 上一步</button>
          <button onClick={()=>navigate('/Upload')} style={navBtnStyle}>下一步 →</button>
        </div>
      </div>

    </div>
  );
}

// 按鈕樣式
const btnStyle = {
  padding:'8px 16px',
  background:'#dc3545',
  color:'#fff',
  border:'none',
  borderRadius:'6px',
  cursor:'pointer'
};

const formBtnStyle = {
  padding:'12px 24px',
  background:'#28a745',
  color:'#fff',
  border:'none',
  borderRadius:'8px',
  cursor:'pointer'
};

const navBtnStyle = {
  padding:'10px 20px',
  background:'#007bff',
  color:'#fff',
  border:'none',
  borderRadius:'8px',
  cursor:'pointer'
};
