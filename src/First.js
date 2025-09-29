import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImg from './components/background.jpg'; // 統一背景圖

export default function Dashboard() {
  const [jobCategory, setJobCategory] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [customJobTitle, setCustomJobTitle] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    if (savedUser) setUsername(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const jobTitlesByCategory = {
    it: ['前端工程師','後端工程師','全端工程師','資料工程師','機器學習工程師','資料科學家','DevOps / SRE','行動應用工程師','嵌入式 / 韌體工程師','資安工程師','測試 / 品質工程師','雲端工程師','平台工程師','資料庫工程師','電腦視覺工程師','NLP / 語言模型工程師'],
    marketing: ['數位行銷','內容行銷','成長駭客','品牌經理','社群經營'],
    design: ['UI 設計師','UX 設計師','視覺設計師','產品設計師','動效設計師'],
    education: ['教師','教學設計','補教講師','教育科技工程師'],
    finance: ['財務分析師','風控 / 風險管理','會計','投資分析']
  };

  const genericTitles = ['工程師','專案經理','設計師','分析師','其他（自訂）'];
  const currentTitles = jobCategory ? jobTitlesByCategory[jobCategory] || genericTitles : genericTitles;

  return (
    <div style={{
      fontFamily: '"Microsoft JhengHei", sans-serif',
      color:'#000',
      backgroundImage:`url(${bgImg})`,
      backgroundSize:'cover',
      minHeight:'100vh',
      padding:'30px',
      boxSizing:'border-box'
    }}>
      
      {/* Header 固定置頂 */}
      <div style={{ position:'fixed', top:0, left:0, width:'100%', background:'rgba(255,255,255,0.85)', padding:'20px 40px', boxShadow:'0 2px 8px rgba(0,0,0,0.1)', zIndex:100, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h1 style={{ margin:0, color:'#8B4513', fontWeight:'700', fontSize:'2.5rem' }}>AI 履歷健診</h1>
        <div style={{ display:'flex', alignItems:'center', gap:'16px', marginRight: '40px' }}>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontWeight:'600' }}>使用者：{username}</div>
            <div style={{ fontSize:'0.9rem', color:'green' }}>狀態：在線</div>
          </div>
          <button onClick={handleLogout} style={{ padding:'8px 16px', background:'#dc3545', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer' }}>登出</button>
        </div>
      </div>

      {/* 主內容 */}
      <div style={{ paddingTop:'100px', maxWidth:'820px', margin:'0 auto' }}>
        <div style={{ background:'#fff', padding:'20px', borderRadius:'10px', boxShadow:'0 2px 8px rgba(0,0,0,0.15)' }}>
          <h2>選擇職業資訊</h2>
          <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
            <div>
              <label>職業類別</label>
              <select value={jobCategory} onChange={(e)=>{ setJobCategory(e.target.value); setJobTitle(''); setCustomJobTitle(''); }}>
                <option value="">請選擇</option>
                <option value="it">資訊科技 (IT)</option>
                <option value="marketing">行銷</option>
                <option value="design">設計</option>
                <option value="education">教育</option>
                <option value="finance">金融</option>
                <option value="other">其他</option>
              </select>
            </div>
            <div>
              <label>職稱</label>
              <select value={jobTitle} onChange={(e)=>{ setJobTitle(e.target.value); if(e.target.value!=='其他（自訂）') setCustomJobTitle(''); }} disabled={!jobCategory}>
                <option value="">{jobCategory ? '請選擇職稱' : '請先選擇職業類別'}</option>
                {currentTitles.map(t=><option key={t} value={t}>{t}</option>)}
                <option value="其他（自訂）">其他（自訂）</option>
              </select>
              {jobTitle==='其他（自訂）' && <input type="text" placeholder="請輸入職稱" value={customJobTitle} onChange={e=>setCustomJobTitle(e.target.value)} />}
            </div>
          </div>
          <div style={{ marginTop:'12px' }}>
            已選擇：類別：{jobCategory || '未選擇'} ／ 職稱：{jobTitle==='其他（自訂）'? (customJobTitle || '尚未輸入') : jobTitle || '未選擇'}
          </div>
        </div>

        {/* 頁面導航 */}
        <div style={{ marginTop:'30px', display:'flex', justifyContent:'space-between' }}>
          <button onClick={()=>navigate('/')} style={navBtnStyle}>← 上一步</button>
          <button onClick={()=>navigate('/FormPage')} style={navBtnStyle}>下一步 →</button>
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  padding:'8px 14px',
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
