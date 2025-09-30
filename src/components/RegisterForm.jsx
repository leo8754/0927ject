import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import PositionSelect from './PositionSelect';
import { sendRegisterRequest } from '../api/register.js';

function RegisterForm() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [simpleCaptcha, setSimpleCaptcha] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSimpleCaptcha(code);
  };

  const sendCode = () => {
    if (!email) {
      setErrorMsg('請輸入 Email');
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);
    alert(`驗證碼已寄送至 ${email}\n（測試用代碼：${code}）`);
  };

  const handleSubmit = async () => {
    if (!name || !email || !password || !phone || !verificationCode || !captchaInput) {
      setErrorMsg('請完整填寫所有欄位');
      return;
    }
    if (verificationCode !== sentCode) {
      setErrorMsg('Email 驗證碼錯誤');
      return;
    }
    if (captchaInput.trim() !== simpleCaptcha) {
      setErrorMsg('驗證碼錯誤');
      return;
    }

    const encryptedPassword = CryptoJS.SHA256(password).toString();

    try {
      await sendRegisterRequest({
        name,
        email,
        password: encryptedPassword,
        phone,
        selected_position: selectedPosition,
        verification_code: verificationCode
      });
      setSuccessMsg('註冊成功！即將跳轉...');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
    const text = await err.response?.text?.(); // 抓後端回傳的錯誤訊息
    setErrorMsg(text || '後端錯誤或資料不合法');
    console.error('❌ 註冊失敗:', err);
    } 
  };

  return (
    <div className="register-form">
      <input placeholder="使用者名稱" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="密碼" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <input placeholder="手機號碼" value={phone} onChange={e => setPhone(e.target.value)} />
      <PositionSelect value={selectedPosition} onChange={setSelectedPosition} />

      <div className="verify-block">
        <input
          placeholder="Email 驗證碼"
          value={verificationCode}
          onChange={e => setVerificationCode(e.target.value)}
        />
        <button onClick={sendCode}>發送驗證碼</button>
      </div>

      {/* ✅ 純文字驗證碼區塊 */}
      <div className="captcha-block" style={{ marginTop: '12px' }}>
        <p>請輸入驗證碼：<strong>{simpleCaptcha}</strong></p>
        <input
          placeholder="請輸入上方驗證碼"
          value={captchaInput}
          onChange={e => setCaptchaInput(e.target.value)}
          style={{ marginTop: '8px' }}
        />
        <button onClick={generateCaptcha} style={{ marginTop: '8px' }}>重新產生驗證碼</button>
      </div>

      {errorMsg && <p className="error">{errorMsg}</p>}
      {successMsg && <p className="success">{successMsg}</p>}

      <button onClick={handleSubmit}>提交註冊</button>
    </div>
  );
}

export default RegisterForm;
