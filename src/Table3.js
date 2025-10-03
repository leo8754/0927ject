import React from "react";
import { useEffect,useState } from "react";
export default function Table1() {
    const [isHidden, setIsHidden] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        identifyNumber: "",
        gender: "",
        address: "",
        birthday: "",
        education: "",
        department: "",
        work: "",
        occupation: "",
        workYear: "",
        maritalStatus: "",
        hobbies: "",
        exerciseFrequency: "",
        agreePrivacy: "" ,
    });
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [serverMsg, setServerMsg] = useState("");
    useEffect(() => {
        validateAll();
    }, [form, touched]);

    const [data, setData] = useState([]);   
    // useEffect(() => {
    //     fetch('http://localhost:8080/users')
    //     .then(response => response.json())
    //     .then(data => setData(data))
    //     .catch(error => console.error('Error fetching data:', error));
    // }, []);
    // 驗證函式 防呆
    function validateAll() {
        const e = {};
        // 姓名：必填
        if (!form.name.trim()) {
            e.name = "請輸入姓名";
        }
        else if (form.name.trim().length < 2) 
        {
            e.name = "姓名至少兩個字以上";
        }    

        // 電子郵件：必填、格式
        if (!form.email.trim()) {
            e.email = "請輸入電子郵件";
        } else if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(form.email)) {
            e.email = "電子郵件格式錯誤";
        }
        // 電話：必填、格式
        if (!form.phone.trim()) {
            e.phone = "請輸入電話";
        } else if (!/^(\+886\-?|0)?9\d{2}\-?\d{3}\-?\d{3}$/.test(form.phone)) {
            e.phone = "電話格式錯誤";
        }
        // 年齡：選填、數字、範圍
        if (form.age.trim()) {
            const age = parseInt(form.age, 10);
            if (isNaN(age)) {
                e.age = "年齡請輸入數字";
            } else if (age < 0 || age > 120) {
                e.age = "年齡範圍錯誤";
            }
        }
        // 身分證 / 統一編號：必填、格式
        if (!form.identifyNumber.trim()) {
            e.identifyNumber = "請輸入身分證或統一編號";
        } else if (!/^[A-Za-z][12]\d{8}$/.test(form.identifyNumber) && !/^\d{8}$/.test(form.identifyNumber)) {
            e.identifyNumber = "身分證或統一編號格式錯誤";
        }
        // 性別：必填
        if (!form.gender.trim()) {
            e.gender = "請選擇性別";
        }
        // 通訊地址：必填
        if (!form.address.trim()) {
            e.address = "請輸入通訊地址";
        }
        // 出生日期：必填
        if (!form.birthday.trim()) {
            e.birthday = "請選擇出生日期";
        }
        // 最高學歷：必填
        if (!form.education.trim()) {
            e.education = "請選擇最高學歷";
        }
        // 科系：必填
        if (!form.department.trim()) {
            e.department = "請輸入科系";
        }
        // 目前職業：必填
        if (!form.work.trim()) {
            e.work = "請輸入目前職業";
        }
        // 工作性質：必填
        if (!form.occupation.trim()) {
            e.occupation = "請選擇工作性質";
        }
        // 工作年資：必填
        if (!form.workYear.trim()) {
            e.workYear = "請選擇工作年資";
        }
        // 婚姻狀況：必填   
        if (!form.maritalStatus.trim()) {
            e.maritalStatus = "請選擇婚姻狀況";
        }
        // 同意隱私權條款：必填
        if (!form.agreePrivacy) {
            e.agreePrivacy = "請同意隱私權條款";
        }
        
        setErrors(e);
        // 是否通過驗證
        setIsValid(Object.keys(e).length === 0);

    }
    // 處理欄位變更
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    }
    // 處理欄位離開
    function handleBlur(e) {
        const { name } = e.target;
        setTouched((s) => ({ ...s, [name]: true }));
    }
    // 重設表單
    function resetForm() {
        setForm({
            name: "",   
            email: "",
            phone: "",
            age: "",
            identifyNumber: "", 
            gender: "",
            address: "",
            birthday: "",
            education: "",
            department: "",
            work: "",
            occupation: "",
            workYear: "",
            maritalStatus: "",
            hobbies: "",
            exerciseFrequency: "",
            agreePrivacy: "" ,
        });
        setTouched({});
        setErrors({});
        setIsValid(false);
        setSubmitted(false);
        setServerMsg("");
    }
    // 處理表單送出
    function handleSubmit(e) {
        e.preventDefault();
        // 全部欄位都標記為已觸碰
        setTouched({
            name: true,
            email: true,
            phone: true,
            age: true,
            identifyNumber: true,
            gender: true,
            address: true,
            birthday: true,
            education: true,
            department: true,
            work: true,
            occupation: true,
            workYear: true,
            maritalStatus: true,
            hobbies: true,
            exerciseFrequency: true,
            agreePrivacy: true,
        });
        // 驗證
        validateAll();  
        if (!isValid) {
            return;
        }
        try {
            const response = fetch('http://localhost:8080/api/form/personalInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            if (response.ok) {
                setSubmitted(true);
                setServerMsg("表單已成功送出！");
            } else {
                setServerMsg("表單送出失敗，請稍後再試。");
                throw new Error("伺服器錯誤");
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setServerMsg("表單送出發生錯誤，請稍後再試。");
            setSubmitted(false);
        }

    }
    return ( 
      <div>
          {/* <Steps /> */}
          <div>
            <h1 className="text-3xl font-bold text-blue-600">Hello Tailwind!</h1>;
          </div>
          
      <div hidden={isHidden}>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
          <div className="bg-blue-600 h-4 rounded-full" style={{ width: '33%' }}></div>
        </div>
          <div className= "my-4">
            <h3>個人資料表單（Table 版）</h3>
            
            <form onSubmit={handleSubmit} noValidate>
              <div className="table-responsive">
                <p className="text-muted small">請填寫下列欄位</p>
                <table className="table table-bordered align-middle">
                  <tbody>
                    <tr>
                      <th className="w-25">姓名 <span className="text-danger">*</span></th>
                      <td>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                          placeholder="例如：王小明"
                        />
                        {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
                      </td>
                    </tr>

                    <tr>
                      <th>電子郵件 <span className="text-danger">*</span></th>
                      <td>
                        <input
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                          placeholder="example@domain.com"
                          type="email"
                        />
                        {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </td>
                    </tr>

                    <tr>
                      <th>電話 <span className="text-danger">*</span></th>
                      <td>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.phone && errors.phone ? "is-invalid" : ""}`}
                          placeholder="例如：0912-345-678 或 +886912345678"
                        />
                        {touched.phone && errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                      </td>
                    </tr>

                    <tr>
                      <th>年齡</th>
                      <td>
                        <input
                          name="age"
                          value={form.age}
                          onChange={(e) => {
                            // 只允許數字輸入（空白允許）
                            const v = e.target.value;
                            if (v === "" || /^\d+$/.test(v)) handleChange(e);
                          }}
                          onBlur={handleBlur}
                          className={`form-control ${touched.age && errors.age ? "is-invalid" : ""}`}
                          placeholder="例如：30"
                        />
                        {touched.age && errors.age && <div className="invalid-feedback">{errors.age}</div>}
                      </td>
                    </tr>

                    <tr>
                      <th>身分證 / 統一編號 <span className="text-danger">*</span></th>
                      <td>
                        <input
                          name="identifyNumber"
                          value={form.identifyNumber}
                          onChange={(e) => {
                            // 過濾掉不必要的字元（只留英數跟破折號）
                            const v = e.target.value;
                            const filtered = v.replace(/[^A-Za-z0-9\-]/g, "");
                            setForm((s) => ({ ...s, identifyNumber: filtered }));
                          }}
                          onBlur={handleBlur}
                          className={`form-control ${touched.identifyNumber && errors.identifyNumber ? "is-invalid" : ""}`}
                          placeholder="例如:A123456789 或 12345678"
                        />
                        {touched.identifyNumber && errors.identifyNumber && <div className="invalid-feedback">{errors.identifyNumber}</div>}
                      </td>
                    </tr>

                    <tr>
                      <th>性別 <span className="text-danger">*</span></th>
                      <td>
                        <div className="d-flex gap-3 align-items-center">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="g-m"
                              value="male"
                              checked={form.gender === "male"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="g-m">
                              男
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="g-f"
                              value="female"
                              checked={form.gender === "female"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="g-f">
                              女
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="g-o"
                              value="other"
                              checked={form.gender === "other"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="g-o">
                              其他
                            </label>
                          </div>
                        </div>
                        {touched.gender && errors.gender && <div className="text-danger small mt-1">{errors.gender}</div>}
                      </td>
                    </tr>

                    <tr>
                      <th>通訊地址 <span className="text-danger">*</span></th>
                      <td>
                        <textarea
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.address && errors.address ? "is-invalid" : ""}`}
                          rows={2}
                          placeholder="例如：台北市信義區市府路45號"
                        />
                        {touched.address && errors.address && <div className="invalid-feedback">{errors.address}</div>}
                      </td>
                    </tr>
                    
                    <tr>
                      <th>出生日期 <span className="text-danger">*</span></th>
                      <td>
                        <input
                          type="date"
                          name="birthday"
                          value={form.birthday}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.birthday && errors.birthday ? "is-invalid" : ""}`}
                          placeholder="請選擇日期"
                        />
                        {touched.birthday && errors.birthday && <div className="invalid-feedback">{errors.birthday}</div>}
                      </td>
                    </tr>
                    
                    <tr>
                      <th>最高學歷 <span className="text-danger">*</span></th>
                      <td>
                        <select
                          name="education"
                          value={form.education}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.education && errors.education ? "is-invalid" : ""}`}

                          placeholder="請選擇學歷"
                        >
                        <option value="">請選擇</option>
                        <option value="none">無</option>
                        <option value="elementary">國小</option>
                        <option value="juniorhigh">國中</option>
                        <option value="highschool">高中職</option>
                        <option value="associate">專科</option>
                        <option value="bachelor">大學</option>
                        <option value="master">碩士</option>
                        <option value="doctor">博士</option>
                        </select>
                        {touched.education && errors.education && <div className="invalid-feedback">{errors.education}</div>}
                      </td>
                    </tr>

                    <tr>
                      <th>科系 <span className="text-danger">*</span></th>
                      <td>
                        <input
                          type="text"
                          name="department"
                          value={form.department}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.department && errors.department ? "is-invalid" : ""}`}

                          placeholder="例如：資訊管理系"
                        />
                        {touched.department && errors.department && <div className="invalid-feedback">{errors.department}</div>}
                      </td>
                    </tr>

                    <tr>
                      <th>目前職業 <span className="text-danger">*</span></th>
                      <td>
                        <input
                          type="text"
                          name="work"
                          value={form.work}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.work && errors.work ? "is-invalid" : ""}`}

                          placeholder="例如：軟體工程師"
                        />
                        {touched.work && errors.work && <div className="invalid-feedback">{errors.work}</div>}
                      </td>
                    </tr>

                    <tr>
                      <th>工作性質 <span className="text-danger">*</span></th>
                      <td>
                        <select
                          name="occupation"
                          value={form.occupation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.occupation && errors.occupation ? "is-invalid" : ""}`}

                        >
                        <option value="">請選擇</option>
                        <option value="fulltime">全職</option>
                        <option value="parttime">兼職</option>
                        <option value="intern">實習</option>
                        <option value="freelance">自由工作者</option>
                        <option value="unemployed">目前無業</option>
                        </select>
                        {touched.occupation && errors.occupation && <div className="invalid-feedback">{errors.occupation}</div>}
                      </td>
                    </tr>

                    <tr>
                      <th>工作年資 <span className="text-danger">*</span></th>
                      <td>
                        <select
                          name="workYear"
                          value={form.workYear}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.workYear && errors.workYear ? "is-invalid" : ""}`}

                        >
                        <option value="">請選擇</option>
                        <option value="0">無工作經驗</option>
                        <option value="1">1 年以下</option>
                        <option value="1-3">1-3 年</option>
                        <option value="3-5">3-5 年</option>
                        <option value="5-10">5-10 年</option>
                        <option value="10+">10 年以上</option>
                        </select>
                        {touched.workYear && errors.workYear && <div className="invalid-feedback">{errors.workYear}</div>}
                      </td>
                    </tr>
                    
                    <tr>
                      <th>婚姻狀況 <span className="text-danger">*</span></th>
                      <td>
                        <select
                          name="maritalStatus"
                          value={form.maritalStatus}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.maritalStatus && errors.maritalStatus ? "is-invalid" : ""}`}

                        >
                        <option value="">請選擇</option>
                        <option value="single">未婚</option>
                        <option value="married">已婚</option>
                        <option value="divorced">離異</option>
                        <option value="widowed">喪偶</option>
                        <option value="other">其他</option>
                        </select>
                        {touched.maritalStatus && errors.maritalStatus && <div className="invalid-feedback">{errors.maritalStatus}</div>}
                      </td>
                    </tr>

                    <tr>
                      <th>興趣 / 愛好 </th>
                      <td>
                        <input
                          name="hobbies"
                          value={form.hobbies}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.hobbies && errors.hobbies ? "is-invalid" : ""}`}
                          rows={2}
                          placeholder="例如：閱讀、旅行、運動"
                        />
                        {touched.hobbies && errors.hobbies && <div className="invalid-feedback">{errors.hobbies}</div>}
                      </td>
                    </tr>

                    <tr>
                      <th>每週運動頻率 </th>
                      <td>
                        <select
                          name="exerciseFrequency"
                          value={form.exerciseFrequency}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.exerciseFrequency && errors.exerciseFrequency ? "is-invalid" : ""}`}

                        >
                        <option value="">請選擇</option>
                        <option value="0">從不</option>
                        <option value="1-2">1-2 次</option>
                        <option value="3-4">3-4 次</option>
                        <option value="5+">5 次以上</option>
                        </select>
                        {touched.exerciseFrequency && errors.exerciseFrequency && <div className="invalid-feedback">{errors.exerciseFrequency}</div>}
                      </td>
                    </tr>

                    <tr>
                      <th>閱讀並同意隱私權條款</th>
                      <td>
                            <input
                              type="checkbox"
                              name="agreePrivacy"
                              checked={form.agreePrivacy === "agree"}
                              value="agree"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${touched.agreePrivacy && errors.agreePrivacy ? "is-invalid" : ""}`}
                            ></input>
                            &nbsp; 我同意隱私權條款
                            {touched.agreePrivacy && errors.agreePrivacy && <div className="invalid-feedback">{errors.agreePrivacy}</div>}
                          
                      </td>
                    </tr>

                    <tr>
                      <th>操作</th>
                      <td>
                        <div className="d-flex gap-2">
                          <button type="submit" className="btn btn-primary" disabled={!isValid}>
                            送出
                          </button>
                          <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                            重設
                          </button>
                          <div className="ms-auto align-self-center text-muted small">
                            {isValid ? <span>資料看起來沒錯，可以送出</span> : <span>尚有錯誤或未填欄位</span>}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  
                    <div className="text-muted">
                    <h6 className="text-danger">隱私權說明</h6>
                    親愛的填寫者您好：<br/>
                    感謝您撥冗填寫本表單。本表單主要用於收集個人基本資料，

                    以便進行學術研究、心理分析或自我了解。
                    <br />
                    一、填寫說明

                    表單中所有題目皆為 選填或必填，必填欄位會標示。

                    所有題目皆為 自我報告，請依照您的真實想法或情況作答。

                    填寫時間約 5~15 分鐘。
                    <br />
                    二、資料使用與隱私

                    您提供的資料將 僅用於本研究 (AI 履歷分析)  /測驗目的。

                    個人資料將 保密處理，不會公開您的姓名或聯絡資訊。

                    統計分析將以 匿名或編碼方式呈現。

                    個人資料將於一個月內自動刪除且不會轉售。
                    <br />
                    三、注意事項

                    請確保在安靜且不受干擾的環境下填寫，以獲得最準確的結果。

                    若遇到不明白的題目，可依照直覺選擇最符合自己的答案。

                    您可 隨時中止填寫，資料將不會被保存。
                    <br />
                    四、聯絡方式

                    如對表單內容或資料使用有疑問，請聯絡我們：

                    聯絡人：__________

                    電子郵件：__________
                    <br/>
                    <div className="text-danger`">
                      <h3>*請注意：提交表單即表示您同意上述隱私權說明。</h3>
                      
                      <h3 className="text-danger">感謝您的配合與支持！
                      祝您填寫順利，並收穫自我了解的價值。
                      </h3 >
                    </div>
                    < h6>
                    研究團隊敬上
                    2025 年 9 月
                  </h6>
                  </div>
                </div>
              </div>
            </form>
          {/* 送出成功後的顯示區塊 */}
          {submitted && (
            <div className="alert alert-success mt-3" role="alert">
              已送出！以下為送出內容（模擬）
              <pre className="mt-2">{JSON.stringify(form, null, 2)}</pre>
            </div>
          )}

          {/* 簡易自訂 CSS（可改成外部檔案）*/}
          <style>{`
            /* 讓 table 的 th 看起來更一致 */
            table.table th { background: #f8f9fa; vertical-align: middle; }

            /* 小螢幕時 th 變成上方 label 風格 */
            @media (max-width: 576px) {
              table.table tbody tr { display: block; margin-bottom: 0.75rem; }
              table.table tbody tr th, table.table tbody tr td { display: block; width: 100%; }
              table.table tbody tr th { font-weight: 600; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}