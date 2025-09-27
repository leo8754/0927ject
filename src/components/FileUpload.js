import React from "react";

function FileUpload({ setResumeText, setResumeFile }) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file); // ✅ 儲存檔案給 ResumePreview

    // 如果是 txt 就讀取文字
    if (file.type === "text/plain") {
      const text = await file.text();
      setResumeText(text);
    } else {
      // 其他類型先存檔名（方便提交診斷用）
      setResumeText(file.name);
    }
  };

  return (
    <div>
      <input type="file" accept=".txt,.pdf,.doc,.docx" onChange={handleFileChange} />
    </div>
  );
}

export default FileUpload;
