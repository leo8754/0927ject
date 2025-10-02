import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // 登出回到登入頁
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* 左側選單 */}
      <div
        style={{
          width: "220px",
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>AI 履歷儀表板</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "20px 0", cursor: "pointer" }} onClick={() => navigate("/home")}>
            📊 首頁
          </li>
          <li style={{ margin: "20px 0", cursor: "pointer" }} onClick={() => navigate("/upload")}>
            📄 上傳履歷
          </li>
          <li style={{ margin: "20px 0", cursor: "pointer" }} onClick={() => navigate("/analysis")}>
            🤖 AI 分析
          </li>
          <li style={{ margin: "20px 0", cursor: "pointer" }} onClick={() => navigate("/suggestions")}>
            💡 優化建議
          </li>
        </ul>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "50px",
            width: "100%",
            padding: "10px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          登出
        </button>
      </div>

      {/* 主內容 */}
      <div style={{ flex: 1, padding: "30px" }}>
        <h1>歡迎使用 AI 履歷儀表板 🎉</h1>
        <p>這裡是登入後的首頁，你可以從左邊選單進入各個功能。</p>
        <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
          <div style={{ background: "#ecf0f1", padding: "20px", borderRadius: "10px" }}>
            <h3>📄 上傳履歷</h3>
            <p>上傳你的履歷檔案，開始進行分析。</p>
          </div>
          <div style={{ background: "#ecf0f1", padding: "20px", borderRadius: "10px" }}>
            <h3>🤖 AI 分析</h3>
            <p>讓 AI 幫你分析履歷內容。</p>
          </div>
          <div style={{ background: "#ecf0f1", padding: "20px", borderRadius: "10px" }}>
            <h3>💡 優化建議</h3>
            <p>獲得履歷改善建議，提升成功率。</p>
          </div>
          <div style={{ background: "#ecf0f1", padding: "20px", borderRadius: "10px" }}>
            <h3>📊 數據總覽</h3>
            <p>查看履歷投遞狀況與面試邀請統計。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
