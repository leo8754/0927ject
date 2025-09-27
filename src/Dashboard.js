import React, { useState } from 'react';
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

  const [jobCategory, setJobCategory] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [customJobTitle, setCustomJobTitle] = useState('');
  const navigate = useNavigate();

  const jobTitlesByCategory = {
    it: ['前端工程師 (Front-end)','後端工程師 (Back-end)','全端工程師 (Full-stack)','資料工程師 (Data Engineer)','機器學習工程師 (ML Engineer)','資料科學家 (Data Scientist)','DevOps / SRE','行動應用工程師 (Mobile)','嵌入式 / 韌體工程師 (Embedded/Firmware)','資安工程師 (Security)','測試 / 品質工程師 (QA/Test)','雲端工程師 (Cloud)','平台工程師 (Platform)','資料庫工程師 (DB Engineer)','電腦視覺工程師 (Computer Vision)','NLP / 語言模型工程師'],
    marketing: ['數位行銷','內容行銷','成長駭客 (Growth)','品牌經理','社群經營'],
    design: ['UI 設計師','UX 設計師','視覺設計師','產品設計師 (Product Designer)','動效設計師'],
    education: ['教師','教學設計','補教講師','教育科技工程師'],
    finance: ['財務分析師','風控 / 風險管理','會計','投資分析']
  };

  const genericTitles = ['工程師','專案經理','設計師','分析師','其他（自訂）'];
  const currentTitles = jobCategory ? jobTitlesByCategory[jobCategory] || genericTitles : genericTitles;

  const handleSubmit = () => {
    if (!pdfFile) {
      alert('請先上傳履歷');
      return;
    }

    alert(`履歷 ${pdfFile.name} 已提交！`);
  
    // 跳轉到分析頁面，傳遞履歷檔案與文字內容
    navigate('/analysis', { state: { resumeFile: pdfFile, resumeText } });
  };

  // ---------------- 上傳 Word 或 PDF ----------------
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop().toLowerCase();

    if (fileExt === 'pdf') {
      setResumeFile(file);
      setPdfFile(file);
      setResumeText('');
    } else if (['doc','docx'].includes(fileExt)) {
      const arrayBuffer = await file.arrayBuffer();
      const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
      setResumeText(html);

      // 建立隱藏 div 渲染 HTML
      const div = document.createElement("div");
      div.innerHTML = html;
      div.style.fontFamily = '"Microsoft JhengHei", sans-serif';
      div.style.lineHeight = "1.5";
      div.style.fontSize = "14pt";
      div.style.width = "595px"; // A4 寬度
      div.style.boxSizing = "border-box";
      div.style.position = "absolute";
      div.style.left = "-9999px";
      document.body.appendChild(div);

      // html2canvas 高解析度
      const canvas = await html2canvas(div, { scale: 3 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = 595;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const pdfBlob = pdf.output("blob");
      document.body.removeChild(div);

      const pdfFile = new File([pdfBlob], file.name.replace(/\.(docx?|DOCX?)$/, '.pdf'), { type: 'application/pdf' });
      setPdfFile(pdfFile);
      setResumeFile(pdfFile);
    } else {
      alert('請上傳 Word (.doc/.docx) 或 PDF (.pdf)');
    }
  };

  return (
    <div style={{ fontFamily: '"Microsoft JhengHei", sans-serif', color: '#000', backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', minHeight: '100vh', padding: '30px', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: 'rgba(255,255,255,0.85)', padding: '20px 40px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ margin: 0, color: '#8B4513', fontWeight: '700', fontSize: '2.5rem' }}>AI 履歷健診</h1>
      </div>

      {/* 主內容 */}
      <div style={{ paddingTop: '100px' }}>
        <div style={{ marginBottom: '36px', background: '#fff', padding: '20px', borderRadius: '10px', maxWidth: '820px', marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          
          {/* 職業選單 */}
          <h2 style={{ marginBottom: '12px' }}>選擇職業資訊</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ minWidth: '220px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>職業類別</label>
              <select value={jobCategory} onChange={(e)=>{setJobCategory(e.target.value); setJobTitle(''); setCustomJobTitle('');}} style={{ width:'100%', padding:'8px', borderRadius:'6px', fontFamily:'"Microsoft JhengHei", sans-serif', color:'#000' }}>
                <option value="">請選擇</option>
                <option value="it">資訊科技 (IT)</option>
                <option value="marketing">行銷</option>
                <option value="design">設計</option>
                <option value="education">教育</option>
                <option value="finance">金融</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div style={{ minWidth: '320px' }}>
              <label style={{ display:'block', marginBottom:'6px', fontWeight:'600' }}>職稱</label>
              <select value={jobTitle} onChange={(e)=>{ setJobTitle(e.target.value); if(e.target.value!=='其他（自訂）') setCustomJobTitle(''); }} disabled={!jobCategory} style={{ width:'100%', padding:'8px', borderRadius:'6px', fontFamily:'"Microsoft JhengHei", sans-serif', color:'#000' }}>
                <option value="">{jobCategory?'請選擇職稱':'請先選擇職業類別'}</option>
                {currentTitles.map(t=><option key={t} value={t}>{t}</option>)}
                <option value="其他（自訂）">其他（自訂）</option>
              </select>
              {jobTitle==='其他（自訂）'&&<input type="text" placeholder="請輸入職稱（自訂）" value={customJobTitle} onChange={e=>setCustomJobTitle(e.target.value)} style={{ marginTop:'8px', width:'100%', padding:'8px', borderRadius:'6px', fontFamily:'"Microsoft JhengHei", sans-serif', color:'#000' }}/> }
            </div>
          </div>

          {/* 已選擇顯示 */}
          <div style={{ marginTop:'18px', color:'#000' }}>
            <strong>已選擇：</strong>
            <span style={{ marginLeft:'8px' }}>
              類別：{jobCategory || '未選擇'} ／ 職稱：{jobTitle==='其他（自訂）'? (customJobTitle || '尚未輸入') : jobTitle || '未選擇'}
            </span>
          </div>

          {/* 表單按鈕 */}
          <div style={{ marginTop:'12px', display:'flex', gap:'12px', flexWrap:'wrap' }}>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdEm7T4s4tEQl1t2EXpqMsqquuT-RkxhP6mWaEB-y3N_C8VoA/viewform" target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}>
              <button style={{ padding:'10px 20px', background:'#28a745', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontFamily:'"Microsoft JhengHei", sans-serif' }}>填寫人格特質表單</button>
            </a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSc3Jp5mdLOuPknXWUjViggAnl70cP0F03xBAsQh8hmTZPcRVA/viewform?usp=header" target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}>
              <button style={{ padding:'10px 20px', background:'#17a2b8', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontFamily:'"Microsoft JhengHei", sans-serif' }}>填寫基本個人資料</button>
            </a>
          </div>

          {/* 上傳 Word/PDF + 預覽 + 提交 */}
          <div style={{ marginTop:'16px', background:'#f9f9f9', padding:'12px', borderRadius:'8px' }}>
            <input type="file" accept=".doc,.docx,.pdf" onChange={handleFileUpload} style={{ padding:'6px' }} />
            <div style={{ marginTop:'12px', display:'flex', gap:'8px', flexWrap:'wrap' }}>
              <button onClick={()=>setShowPreview(true)} disabled={!pdfFile} style={{ padding:'10px 20px', background:pdfFile?'#007bff':'#9bb8ff', color:'#fff', border:'none', borderRadius:'8px', cursor:pdfFile?'pointer':'not-allowed' }}>預覽履歷</button>
              <button onClick={handleSubmit} disabled={!pdfFile} style={{ padding:'10px 20px', background:pdfFile?'#ffc107':'#e0d3a5', color:'#000', border:'none', borderRadius:'8px', cursor:pdfFile?'pointer':'not-allowed' }}>提交履歷</button>
            </div>
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
      </div>
    </div>
  );
}
