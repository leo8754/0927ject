import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImg from './components/background.jpg';

export default function PersonalityFormPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

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

  // ---------------- 顏色頭像 ----------------
  const colors = ["#007bff", "#28a745", "#ffc107", "#17a2b8", "#6f42c1"];
  const avatarColor = useMemo(() => {
    if (!username) return colors[0];
    const charCode = username.charCodeAt(0);
    return colors[charCode % colors.length];
  }, [username]);

  // ---------------- 問卷設定 ----------------
  const questionLib = [
    "我喜歡嘗試新事物 (1=非常不認同，10=非常認同)",
    "我對藝術和美感有高度興趣 (1=非常不認同，10=非常認同)",
    "我喜歡思考抽象的概念或哲學問題 (1=非常不認同，10=非常認同)",
    "我常有新奇的想法或創意 (1=非常不認同，10=非常認同）",
    "我會事先計劃好工作或生活 (1=非常不認同，10=非常認同)",
    "我做事有條理，按部就班 (1=非常不認同，10=非常認同)",
    "我能夠自我約束，不輕易拖延 (1=非常不認同，10=非常認同)",
    "我對達成目標有強烈動力 (1=非常不認同，10=非常認同)",
    "我喜歡和很多人互動 (1=非常不認同，10=非常認同)",
    "我在社交場合感到自在和有活力 (1=非常不認同，10=非常認同)",
    "我喜歡參加聚會或團體活動 (1=非常不認同，10=非常認同)",
    "我容易與他人建立友好關係 (1=非常不認同，10=非常認同)",
    "我樂於幫助他人，善解人意 (1=非常不認同，10=非常認同)",
    "我傾向信任他人，而不是懷疑 (1=非常不認同，10=非常認同)",
    "我會避免衝突，維持和諧關係 (1=非常不認同，10=非常認同)",
    "我容易體諒別人的需求和感受 (1=非常不認同，10=非常認同)",
    "我容易感到焦慮或緊張 (1=非常不認同，10=非常認同)",
    "我情緒容易波動 (1=非常不認同，10=非常認同)",
    "我會對小事感到擔憂或不安 (1=非常不認同，10=非常認同)",
    "我有時候會感到沮喪或心情低落 (1=非常不認同，10=非常認同)"
  ];

  const questions = questionLib.map((text, i) => ({
    id: i + 1,
    text: `第 ${i + 1} 題: ${text}`
  }));

  const initialValues = {};
  questions.forEach(q => initialValues[`question${q.id}`] = "");
  initialValues.responseContext = "";

  const [formData, setFormData] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateAll();
  }, [formData]);

  function validateAll() {
    const e = {};
    for (let i = 1; i <= 20; i++) {
      const key = `question${i}`;
      if (!formData[key]) e[key] = "請完成所有欄位";
    }
    setErrors(e);
    setIsValid(Object.keys(e).length === 0);
    return Object.keys(e).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(s => ({ ...s, [name]: value }));
    setTouched(s => ({ ...s, [name]: true }));
  }

  function resetForm() {
    setFormData(initialValues);
    setTouched({});
    setErrors({});
    setIsValid(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateAll()) {
      alert("請先完成所有題目再送出！");
      return;
    }
    alert("表單完成，跳轉中...");
    navigate('/Upload');
  }

  const footerStyle = {
    padding: '20px 0',
    backgroundColor: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontSize: '0.9em',
    color: '#6F4E37'
  };

  const btnStyle = {
    padding:'8px 16px',
    background:'#dc3545',
    color:'#fff',
    border:'none',
    borderRadius:'6px',
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

  return (
    <div style={{
      fontFamily: '"Microsoft JhengHei", sans-serif',
      color: '#000',
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      display:'flex',
      flexDirection:'column'
    }}>
      {/* Header */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%',
        background: 'rgba(255,255,255,0.85)',
        padding: '20px 40px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, color: '#8B4513', fontWeight: '700', fontSize: '2.5rem' }}>AI 履歷健診</h1>
        {/* 頭像 + 登出 */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '80px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <div style={{
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
          }}>
            {username ? username.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <div style={{ fontWeight: '600' }}>{username}</div>
            <div style={{ fontSize: '0.9rem', color: 'green' }}><b>狀態：在線</b></div>
          </div>
          <button onClick={handleLogout} style={btnStyle}>登出</button>
        </div>
      </div>

      {/* 中央內容區 */}
      <div style={{
        flex:1,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
        paddingTop:'60px',
        paddingBottom:'20px',
        gap:'10px'
      }}>
        <h2 style={{ fontSize:'2.5rem', color:'#8B4513', textAlign:'center' }}>人格特質表單</h2>

        <div style={{
          width:'100%',
          maxWidth:'700px',
          padding:'20px',
          background:'#fff',
          borderRadius:'16px',
          boxShadow:'0 8px 20px rgba(0,0,0,0.15)',
          border:'1px solid #e0e0e0'
        }}>
          <p style={{ marginBottom:'25px', textAlign:'center' }}>
            填寫此表單能協助 AI 更準確分析您的優勢，並打造與您特質相符的履歷優化建議，提升求職競爭力。
          </p>

          <form onSubmit={handleSubmit}>
            {questions.map(q => (
              <div key={q.id} style={{ marginBottom:'12px' }}>
                <p>{q.text} <span style={{color:'red'}}>*</span></p>
                <select
                  name={`question${q.id}`}
                  value={formData[`question${q.id}`]}
                  onChange={handleChange}
                  style={{ padding:'8px', width:'100%' }}
                >
                  <option value="">請選擇</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                  ))}
                </select>
                {touched[`question${q.id}`] && errors[`question${q.id}`] && (
                  <div style={{color:'red', fontSize:'0.9rem'}}>{errors[`question${q.id}`]}</div>
                )}
              </div>
            ))}

            <div style={{ margin:'10px 0' }}>
              <p>對於這份表單有任何想法，歡迎在下方區域留言</p>
              <textarea
                name="responseContext"
                value={formData.responseContext}
                onChange={handleChange}
                placeholder="告訴我你的想法"
                style={{ width:'100%', minHeight:'80px', padding:'8px' }}
              />
            </div>

            <div style={{ display:'flex', gap:'20px', justifyContent:'center', marginTop:'10px' }}>
              <button type="submit" style={navBtnStyle} disabled={!isValid}>送出</button>
              <button type="button" onClick={resetForm} style={navBtnStyle}>重設</button>
            </div>

            <div style={{ textAlign:'center', marginTop:'10px' }}>
              {isValid ? <span style={{color:'green'}}><b>資料填寫完畢，可以送出</b></span>
                        : <span style={{color:'red'}}><b>尚有錯誤或未填欄位</b></span>}
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer style={footerStyle}>
        2025 程式驅動 AI 履歷健診團隊 版權所有 | 聯絡我們: contact@airesume.com
      </footer>
    </div>
  );
}
