import React from 'react';

function ResumePreview({ file, text }) {
  if (file) {
    const fileType = file.type;

    // PDF 預覽
    if (fileType === 'application/pdf') {
      const fileURL = URL.createObjectURL(file);
      return (
        <div className="card">
          <h2>履歷預覽 (PDF)</h2>
          <iframe
            src={fileURL}
            width="100%"
            height="500px"
            style={{ border: 'none' }}
            title="resume-pdf"
          ></iframe>
        </div>
      );
    }

    // Word 檔提示
    if (
      fileType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword'
    ) {
      return (
        <div className="card">
          <h2>履歷預覽 (Word)</h2>
          <p style={{ color: 'red' }}>
            目前不支援直接預覽 Word 檔，請轉換為 PDF 檔上傳。
          </p>
        </div>
      );
    }

    // 其他檔案格式
    return (
      <div className="card">
        <h2>履歷預覽</h2>
        <p>不支援的檔案格式：{fileType}</p>
      </div>
    );
  }

  // 純文字內容
  return (
    <div className="card">
      <h2>履歷預覽 (文字)</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {text || '尚未上傳履歷'}
      </pre>
    </div>
  );
}

export default ResumePreview;
