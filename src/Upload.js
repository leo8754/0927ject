// src/Dashboard.js
import React, { useState, useEffect, useMemo } from 'react';
import bgImg from './components/background.jpg';
import * as mammoth from 'mammoth';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // ---------------- 讀取登入者 ----------------
  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    if (savedUser) setUsername(savedUser);
  }, []);

  // ---------------- 顏色頭像 ----------------
  const colors = ["#007bff"];
  const avatarColor = useMemo(() => {
    if (!username) return colors[0];
    const charCode = username.charCodeAt(0);
    return colors[charCode % colors.length];
  }, [username]);

  // ---------------- 登出 ----------------
  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  // ---------------- 提交履歷 ----------------
  const handleSubmit = () => {
    if (!pdfFile) {
      alert('請先上傳履歷');
      return;
    }
    const score = Math.floor(Math.random() * 41) + 60; // 60-100分
    navigate('/analyze', { state: { resumeFile: pdfFile, resumeText, score } });
  };

  // ---------------- 上傳 Word / PDF ----------------
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    setLoading(true);

    if (ext === 'pdf') {
      setResumeFile(file);
      setPdfFile(file);
      setResumeText('');
      setLoading(false);
    } else if (['doc', 'docx'].includes(ext)) {
      const arrayBuffer = await file.arrayBuffer();
      const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
      setResumeText(html);

      const div = document.createElement('div');
      div.innerHTML = html;
      div.style.fontFamily = '"Microsoft JhengHei", sans-serif';
      div.style.lineHeight = '1.5';
      div.style.fontSize = '14pt';
      div.style.width = '595px';
      div.style.position = 'absolute';
      div.style.left = '-9999px';
      document.body.appendChild(div);

      const canvas = await html2canvas(div, { scale: 3 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = 595;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const pdfBlob = pdf.output('blob');
      document.body.removeChild(div);

      const pdfFile = new File([pdfBlob], file.name.replace(/\.(docx?|DOCX?)$/, '.pdf'), { type: 'application/pdf' });
      setPdfFile(pdfFile);
      setResumeFile(pdfFile);
      setLoading(false);
    } else {
      alert('請上傳 Word 或 PDF');
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: '"Microsoft JhengHei", sans-serif',
      color: '#000',
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      padding: '30px',
      boxSizing: 'border-box',
      paddingBottom: '120px' // 預留 footer 空間
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

        {/* 右上角頭像 + 狀態 + 回首頁按鈕 */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '80px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
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
          <div>
            <div style={{ fontWeight: '600' }}>{username}</div>
            <div style={{ fontSize: '0.9rem', color: 'green' }}><b>狀態：在線</b></div>
          </div>

          {/* 回首頁按鈕 */}
          <button onClick={handleLogout} style={{ ...btnStyle }}>回首頁</button>
        </div>
      </div>

      {/* 上傳區卡片 */}
      <div style={{
        background: '#fdfdfd',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginTop: '120px',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center'
      }}>
        <p style={{ marginBottom: '12px', color: '#555' }}>
          歡迎使用 AI 履歷健診！<br />
          請上傳您的 Word 或 PDF 履歷，我們將自動分析並給出建議。
        </p>

        <input type="file" accept=".doc,.docx,.pdf" onChange={handleFileUpload} />

        {loading && <p style={{ color: '#007bff', marginTop: '10px' }}>履歷處理中，請稍候...</p>}

        <div style={{ marginTop: '12px' }}>
          <button
            onClick={handleSubmit}
            disabled={!pdfFile || loading}
            style={{
              padding: '10px 20px',
              background: pdfFile ? '#ffc107' : '#e0d3a5',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              cursor: pdfFile ? 'pointer' : 'not-allowed'
            }}>
            提交履歷 & 立即分析
          </button>
        </div>

        <div style={{ marginTop: '20px', fontSize: '0.85rem', color: '#666', textAlign: 'left' }}>
          <strong>小提醒：</strong><br />
          1. 履歷中多用量化成果（例如完成過2個專案）。<br />
          2. 簡潔明瞭的自我介紹更容易被 AI 分析抓到重點。
        </div>
      </div>

      {/* Footer */}
      <footer style={footerStyle}>
        2025 程式驅動 AI 履歷健診團隊 版權所有 | 聯絡我們: contact@airesume.com
      </footer>
    </div>
  );
}

const btnStyle = {
  padding: '8px 16px',
  background: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

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
