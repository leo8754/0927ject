import React, { useState } from 'react';
//import './styles.css';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    personality: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // 你可以在這裡加上 API 呼叫或狀態處理
  };

  return (
    <div className="form-container">
      <h2>基本資料與人格特質填寫</h2>
      <form onSubmit={handleSubmit}>
        <label>姓名：
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>年齡：
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </label>

        <label>Email：
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>人格特質：
          <select name="personality" value={formData.personality} onChange={handleChange} required>
            <option value="">請選擇</option>
            <option value="INTJ">INTJ</option>
            <option value="INFP">INFP</option>
            <option value="ENTP">ENTP</option>
            <option value="ISFJ">ISFJ</option>
            {/* 你可以依需要新增其他選項 */}
          </select>
        </label>

        <label>簡介：
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        </label>

        <button type="submit">送出</button>
      </form>
    </div>
  );
};

export default ProfileForm;
