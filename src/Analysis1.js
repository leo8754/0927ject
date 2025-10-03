import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bgImg from './components/background.jpg';

export default function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resumeFile, resumeText } = location.state || {};
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    if (resumeText) analyzeResume(resumeText);
  }, [resumeText]);

  const analyzeResume = (text) => {
    const result = { strengths: [], weaknesses: [] };
    if (text.includes('管理') || text.includes('領導')) result.strengths.push('具管理或領導經驗');
    if (!text.includes('專案') && !text.includes('Project')) result.weaknesses.push('專案經驗描述不足');
    if (text.length < 300) result.weaknesses.push('履歷內容過少');
    if (text.includes('JavaScript') || text.includes('React')) result.strengths.push('程式技能清楚');
    setAnalysisResult(result);
  };

  // 共用按鈕樣式
  const navBtnStyle = {
    padding: "10px 20px",
    background: "#6F4E37",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  };

  return (
    <div
      style={{
        fontFamily: '"Microsoft JhengHei", sans-serif',
        minHeight: '100vh',
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '120px',
        paddingBottom: '80px', // 預留 footer 空間
        boxSizing: 'border-box',
      }}
    >
      {/* 固定置頂標題 */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        zIndex: 999,
        textAlign: 'center',
        padding: '20px 0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ color: '#8B4513', fontSize: '2.5rem', fontWeight: '700', margin: 0 }}>
          AI 履歷健診
        </h1>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '12px',
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto 40px auto',
      }}>
        {/* PDF 預覽 */}
        {resumeFile && (
          <div style={{ marginBottom: '20px' }}>
            <h2>PDF 預覽</h2>
            <iframe
              src={URL.createObjectURL(resumeFile)}
              title="Resume Preview"
              style={{ width: '100%', height: '60vh', border: '1px solid #ccc' }}
            />
          </div>
        )}

        {/* 優缺點分析 */}
        {analysisResult && (
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>履歷分析結果</h2>

            <h3>優點</h3>
            {analysisResult.strengths.length ? (
              <ul>{analysisResult.strengths.map((s, idx) => <li key={idx}>{s}</li>)}</ul>
            ) : <p>暫無優點分析</p>}

            <h3>缺點</h3>
            {analysisResult.weaknesses.length ? (
              <ul>{analysisResult.weaknesses.map((w, idx) => <li key={idx}>{w}</li>)}</ul>
            ) : <p>暫無缺點分析</p>}
          </div>
        )}

        {/* 頁面導航按鈕 */}
        <div style={{ display:'flex', justifyContent:'center', gap:'30px', marginTop:'40px' }}>
          <button onClick={()=>navigate('/visitors')} style={navBtnStyle}>← 上一步</button>
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" style={footerStyle}>
        2025 程式驅動 AI 履歷健診團隊 版權所有 | 聯絡我們: contact@airesume.com
      </footer>
    </div>
  );
}

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  textAlign: 'center',
  padding: '15px 10px',
  background: 'rgba(255,255,255,0.9)',
  borderTop: '1px solid #ddd',
  fontSize: '0.9rem',
  color: '#555',
  zIndex: 99
};
