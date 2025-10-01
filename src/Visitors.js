import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import ResumePreview from './components/ResumePreview';
import bgImg from './components/background.jpg';
import mammoth from 'mammoth';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('在線');
  const navigate = useNavigate();

  // 初始化使用者
  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      setUsername(savedUser);
      setStatus('在線');
    } else {
      setStatus('離線');
    }
  }, []);

  // Word 轉 PDF
  const convertDocxToPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

    const div = document.createElement("div");
    div.innerHTML = html;
    div.style.fontFamily = '"Microsoft JhengHei", sans-serif';
    div.style.lineHeight = "1.5";
    div.style.fontSize = "14pt";
    div.style.width = "595px";
    div.style.boxSizing = "border-box";
    div.style.position = "absolute";
    div.style.left = "-9999px";
    document.body.appendChild(div);

    const canvas = await html2canvas(div, { scale: 3 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = 595;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    const pdfBlob = pdf.output("blob");
    document.body.removeChild(div);

    const pdfFile = new File([pdfBlob], "resume.pdf", { type: "application/pdf" });
    setPdfFile(pdfFile);
  };

  // 處理檔案上傳
  const handleFileUpload = async (file, text) => {
    setResumeText(text);
    if (file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
      await convertDocxToPDF(file);
      setResumeFile(null);
    } else if (file.name.endsWith(".pdf")) {
      setResumeFile(file);
      setPdfFile(file);
    } else {
      alert("只支援 Word 或 PDF 檔案！");
    }
  };

  // 提交履歷
  const handleSubmit = () => {
    if (!pdfFile) {
      alert("請先上傳履歷！");
      return;
    }
    navigate('/analysis1', { state: { resumeFile: pdfFile, resumeText } });
  };

  // 登出
  const handleLogout = () => {
    localStorage.removeItem('username');
    setStatus('離線');
    setUsername('');
    navigate('/');
  };

  const navBtnStyle = {
    padding: "10px 20px",
    background: "#200ae8ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  };

  const footerStyle = {
    marginTop: '40px',
    padding: '20px 0',
    backgroundColor: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontSize: '0.9em',
    color: '#6F4E37',
    borderRadius: '8px'
  };

  // 頭像顏色
  const avatarColor = '#007bff';

  return (
    <div
      style={{
        fontFamily: '"Microsoft JhengHei", sans-serif',
        color: '#000',
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        padding: '30px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          background: 'rgba(255,255,255,0.85)',
          padding: '20px 40px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h1 style={{ margin: 0, color: '#8B4513', fontWeight: '700', fontSize: '2.5rem' }}>
          AI 履歷健診
        </h1>

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
            {username ? username.charAt(0).toUpperCase() : "👤"}
          </div>

          {/* 使用者資訊 + 登出 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginRight: '40px' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '600' }}>{"訪客登入"}</div>
              <div style={{fontSize:'0.9rem', color:'green' }}>
                <b>狀態：在線</b>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                background: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              登出
            </button>
          </div>
        </div>
      </div>

      {/* 主內容 */}
      <div style={{ paddingTop: '100px', maxWidth: '820px', margin: '0 auto' }}>
        <div
          style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            color: '#000'
          }}
        >
          <h2>上傳履歷</h2>
          <FileUpload setResumeText={setResumeText} setResumeFile={handleFileUpload} />

          <div style={{ marginTop: "18px" }}>
            <button
              onClick={() => setShowPreview(true)}
              disabled={!pdfFile}
              style={{
                padding: "10px 20px",
                background: pdfFile ? "#007bff" : "#9bb8ff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: pdfFile ? "pointer" : "not-allowed"
              }}
            >
              預覽履歷
            </button>

            <button
              onClick={handleSubmit}
              disabled={!pdfFile}
              style={{
                padding: "10px 20px",
                marginLeft: "12px",
                background: pdfFile ? "#28a745" : "#b7e0b4",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: pdfFile ? "pointer" : "not-allowed"
              }}
            >
              提交履歷
            </button>
          </div>
        </div>

        {/* 頁面導航按鈕 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '40px' }}>
          <button onClick={() => navigate('/')} style={navBtnStyle}>← 上一步</button>
        </div>

        {/* Footer */}
        <footer style={footerStyle}>
          2025 程式驅動 AI 履歷健診團隊 版權所有 | 聯絡我們: contact@airesume.com
        </footer>

        {/* 預覽 Modal */}
        {showPreview && pdfFile && (
          <>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.5)"
              }}
              onClick={() => setShowPreview(false)}
            />
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                zIndex: 1000,
                width: "90%",
                maxWidth: "1000px",
                maxHeight: "90%",
                overflow: "auto"
              }}
            >
              <ResumePreview file={pdfFile} text={resumeText} style={{ width: "100%", height: "80vh" }} />
              <div style={{ textAlign: "right" }}>
                <button
                  onClick={() => setShowPreview(false)}
                  style={{
                    marginTop: "12px",
                    padding: "8px 14px",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  關閉
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
