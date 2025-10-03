import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-10">AI 履歷健檢後台</h1>

      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        
        {/* 履歷管理 */}
        <div className="p-6 bg-white shadow rounded-2xl text-center hover:shadow-lg transition">
          <h2 className="text-lg mb-3">履歷管理</h2>
          <button 
            onClick={() => goTo("/resumes")}
            className="text-green-600 font-bold hover:underline"
          >
            查看 / 新增 / 修改 / 刪除
          </button>
        </div>

        {/* 檢測報告管理 */}
        <div className="p-6 bg-white shadow rounded-2xl text-center hover:shadow-lg transition">
          <h2 className="text-lg mb-3">檢測報告管理</h2>
          <button 
            onClick={() => goTo("/reports")}
            className="text-red-600 font-bold hover:underline"
          >
            查看 / 新增 / 修改 / 刪除
          </button>
        </div>

        {/* 會員管理 */}
        <div className="p-6 bg-white shadow rounded-2xl text-center hover:shadow-lg transition">
          <h2 className="text-lg mb-3">會員管理</h2>
          <button 
            onClick={() => goTo("/members")}
            className="text-cyan-600 font-bold hover:underline"
          >
            查看 / 新增 / 修改 / 刪除
          </button>
        </div>

        {/* 職缺建議管理 */}
        <div className="p-6 bg-white shadow rounded-2xl text-center hover:shadow-lg transition">
          <h2 className="text-lg mb-3">職缺建議管理</h2>
          <button 
            onClick={() => goTo("/jobs")}
            className="text-blue-600 font-bold hover:underline"
          >
            查看 / 新增 / 修改 / 刪除
          </button>
        </div>
      </div>
    </div>
  );
}
