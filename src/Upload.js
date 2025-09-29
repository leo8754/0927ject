import React, { useState, useEffect } from 'react';
import bgImg from './components/background.jpg';
import * as mammoth from 'mammoth';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

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

  // ---------------- 提交履歷 ----------------
  const handleSubmit = () => {
    if (!pdfFile) {
      alert('請先上傳履歷');
      return;
    }
    navigate('/analysis', { state: { resumeFile: pdfFile, resumeText } });
  };

  // ---------------- 上傳 Word / PDF ----------------
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'pdf') {
      setResumeFile(file);
      setPdfFile(file);
      setResumeText('');
    } else if (['doc','docx'].includes(ext)) {
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
    } else {
      alert('請上傳 Word 或 PDF');
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

      {/* 上傳履歷 */}
      <div style={{ background:'#f9f9f9', padding:'12px', borderRadius:'8px', marginTop:'120px', maxWidth:'500px', marginLeft:'auto', marginRight:'auto' }}>
        <input type="file" accept=".doc,.docx,.pdf" onChange={handleFileUpload} />
        <div style={{ marginTop:'12px', display:'flex', gap:'8px', flexWrap:'wrap' }}>
          <button onClick={()=>setShowPreview(true)} disabled={!pdfFile} style={{ padding:'10px 20px', background:pdfFile?'#007bff':'#9bb8ff', color:'#fff', border:'none', borderRadius:'8px', cursor:pdfFile?'pointer':'not-allowed' }}>預覽履歷</button>
          <button onClick={handleSubmit} disabled={!pdfFile} style={{ padding:'10px 20px', background:pdfFile?'#ffc107':'#e0d3a5', color:'#000', border:'none', borderRadius:'8px', cursor:pdfFile?'pointer':'not-allowed' }}>提交履歷</button>
        </div>
      </div>

      {/* PDF 預覽 Modal */}
      {showPreview && pdfFile && (
        <>
          <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)' }} onClick={()=>setShowPreview(false)} />
          <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)', background:'white', padding:'20px', borderRadius:'12px', zIndex:1000, width:'90%', maxWidth:'1000px', maxHeight:'90%', overflow:'auto' }}>
            <iframe src={URL.createObjectURL(pdfFile)} title="Resume Preview" style={{ width:'100%', height:'80vh', border:'none' }} />
            <div style={{ textAlign:'right' }}>
              <button onClick={()=>setShowPreview(false)} style={{ marginTop:'12px', padding:'8px 14px', background:'#dc3545', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' }}>關閉</button>
            </div>
          </div>
        </>
      )}

      {/* 頁面導航按鈕（固定在主畫面底部） */}
      <div style={{ display:'flex', justifyContent:'center', gap:'30px', marginTop:'40px' }}>
        <button onClick={()=>navigate('/FormPage')} style={navBtnStyle}>← 上一步</button>
        
      </div>

    </div>
  );
}

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
  background:'#6F4E37',
  color:'#fff',
  border:'none',
  borderRadius:'8px',
  cursor:'pointer',
  fontWeight:'bold'
};
