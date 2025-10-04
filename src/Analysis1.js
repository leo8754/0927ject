// src/Analyze.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bgImg from './components/background.jpg';

export default function Analyze() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resumeText, jobTitle } = location.state || {};

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!resumeText || !jobTitle) {
        setLoading(false);
        return;
      }

      const prompt = `請根據以下履歷內容，分析它是否符合「${jobTitle}」的職務需求，並分成以下兩段回覆：\n\n1️⃣ 優勢：列出履歷中有助於應徵此職位的亮點。\n2️⃣ 待加強項目：指出可能不足或需要補充的地方。\n\n履歷內容如下：\n${resumeText}`;

      try {
        const response = await fetch('/api/ollama/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });

        const result = await response.json();
        setAnalysis(result); // result = { score, strengths, weaknesses }
      } catch (error) {
        console.error('分析失敗', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [resumeText, jobTitle]);

  return (
    <div style={{
      fontFamily: '"Microsoft JhengHei", sans-serif',
      minHeight: '100vh',
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      color: '#000',
      padding: '30px',
      boxSizing: 'border-box',
      paddingBottom: '80px'
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
        <h1 style={{ margin:0, color:'#8B4513', fontWeight:'700', fontSize:'2.5rem' }}>AI 履歷分析結果</h1>
        <button 
          onClick={() => navigate('/')} 
          style={{
            padding:'8px 16px',
            background:'#007bff',
            color:'#fff',
            border:'none',
            borderRadius:'6px',
            cursor:'pointer',
            marginRight: '45px'
          }}
        >
          回首頁
        </button>
      </div>

      {/* 分析內容區 */}
      <div style={{ marginTop:'140px', maxWidth:'800px', marginLeft:'auto', marginRight:'auto', background:'rgba(255,255,255,0.9)', padding:'20px', borderRadius:'12px' }}>
        {loading && <div style={{ fontSize:'1.2rem' }}>⏳ 分析中，請稍候...</div>}

        {!loading && !analysis && (
          <div style={{ fontSize:'1.2rem', color:'#dc3545' }}>⚠️ 無法取得分析結果，請稍後再試。</div>
        )}

        {!loading && analysis && (
          <>
            <h2 style={{ color:'#8B4513' }}>總分：{analysis.score ?? '—'} / 100</h2>

            {/* 優點 */}
          <div style={{ marginTop:'20px' }}>
            <h3 style={{ color:'#28a745' }}>優點</h3>
            {Array.isArray(analysis?.strengths) ? (
              <ul>
                {analysis.strengths.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#888' }}>尚未提供優點分析</p>
            )}
          </div>
          
          {/* 待加強項目 */}
          <div style={{ marginTop:'20px' }}>
            <h3 style={{ color:'#dc3545' }}>待加強項目</h3>
            {Array.isArray(analysis?.weaknesses) ? (
              <ul>
                {analysis.weaknesses.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#888' }}>尚未提供待加強項目分析</p>
            )}
          </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer style={{
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
      }}>
        2025 程式驅動 AI 履歷健診團隊 版權所有 | 聯絡我們: contact@airesume.com
      </footer>
    </div>
  );
}
