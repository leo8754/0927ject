import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Table2() {
    const navigate = useNavigate();

    const questionLib = [
        "我喜歡嘗試新事物 (1=非常不認同，10=非常認同)",
        "我對藝術和美感有高度興趣 (1=非常不認同，10=非常認同)",
        "我喜歡思考抽象的概念或哲學問題 (1=非常不認同，10=非常認同)",
        "我常有新奇的想法或創意 (1=非常不認同，10=非常認同）",
        "我會事先計劃好工作或生活 (1=非常不認同，10=非常認同)",
        "我做事有條理，按部就班 (1=非常不認同，10=非常認同)",
        "我能夠自我約束，不輕易拖延 (1=非常不認同，10=非常認同)",
        "我對達成目標有強烈動力 (1=非常不認同，10=非常認同)",
        "我喜歡和很多人互動 (1=非常不認同，10=非常認同)",
        "我在社交場合感到自在和有活力 (1=非常不認同，10=非常認同)",
        "我喜歡參加聚會或團體活動 (1=非常不認同，10=非常認同)",
        "我容易與他人建立友好關係 (1=非常不認同，10=非常認同)",
        "我樂於幫助他人，善解人意 (1=非常不認同，10=非常認同)",
        "我傾向信任他人，而不是懷疑 (1=非常不認同，10=非常認同)",
        "我會避免衝突，維持和諧關係 (1=非常不認同，10=非常認同)",
        "我容易體諒別人的需求和感受 (1=非常不認同，10=非常認同)",
        "我容易感到焦慮或緊張 (1=非常不認同，10=非常認同)",
        "我情緒容易波動 (1=非常不認同，10=非常認同)",
        "我會對小事感到擔憂或不安 (1=非常不認同，10=非常認同)",
        "我有時候會感到沮喪或心情低落 (1=非常不認同，10=非常認同)"
    ];

    const questions = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        text: `第 ${i + 1} 題: ${questionLib[i]} `
    }));

    const [QuestionColumn, setQuestionColumn] = useState({
        question1: "", question2: "", question3: "", question4: "", question5: "",
        question6: "", question7: "", question8: "", question9: "", question10: "",
        question11: "", question12: "", question13: "", question14: "", question15: "",
        question16: "", question17: "", question18: "", question19: "", question20: "",
        responseContext: "",
    });

    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        validateAll();
    }, [QuestionColumn]);

    function validateAll() {
        const e = {};
        for (let i = 1; i <= 20; i++) {
            const key = `question${i}`;
            if (!QuestionColumn[key].trim()) {
                e[key] = "請完成所有欄位";
            }
        }
        setErrors(e);
        const valid = (Object.keys(e).length === 0);
        setIsValid(valid);
        return valid;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setQuestionColumn(s => ({ ...s, [name]: value }));
        setTouched(s => ({ ...s, [name]: true }));
    }

    function resetForm() {
        setQuestionColumn({
            question1: "", question2: "", question3: "", question4: "", question5: "",
            question6: "", question7: "", question8: "", question9: "", question10: "",
            question11: "", question12: "", question13: "", question14: "", question15: "",
            question16: "", question17: "", question18: "", question19: "", question20: "",
            responseContext: "",
        });
        setTouched({});
        setErrors({});
        setIsValid(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const valid = validateAll();
        if (!valid) {
            alert("請先完成所有題目再送出！");
            return;
        }

        try {
            alert("全部完成，跳轉中...");
            navigate('/FormPage1');

        } catch (error) {
            console.error('表單送出錯誤:', error);
            alert("表單送出發生錯誤，請稍後再試。");
        }
    }

    return (
        <div>
            <header>
                <h1 id="title">人格特質表單</h1>
            </header>
            <form id="survey-form" onSubmit={handleSubmit} noValidate>
                <div>
                    {questions.map((q) => (
                        <div key={q.id}>
                            <p>{q.text}<span className="text-danger">*</span></p>
                            <select
                                name={`question${q.id}`}
                                value={QuestionColumn[`question${q.id}`]}
                                onChange={handleChange}
                                className={touched[`question${q.id}`] && errors[`question${q.id}`] ? "is-invalid" : ""}
                            >
                                <option value="">請選擇</option>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            {touched[`question${q.id}`] && errors[`question${q.id}`] && (
                                <div className="invalid-feedback" style={{color:"red"}}>{errors[`question${q.id}`]}</div>
                            )}
                        </div>
                    ))}
                </div>

                <div>
                    <p>對於這份表單有任何想法，歡迎在下方區域留言</p>
                    <textarea
                        id="share"
                        name="responseContext"
                        value={QuestionColumn.responseContext}
                        onChange={handleChange}
                        placeholder="告訴我你的想法"
                    ></textarea>
                </div>

                <div>
                    <button type="submit" id="submit" disabled={!isValid}>送出</button>
                    <button type="button" onClick={resetForm}>重設</button>
                </div>

                <div className="ms-auto align-self-center text-muted small">
                    {isValid ? 
                        <span style={{color: "green"}}><b>資料填寫完畢，可以送出</b></span> : 
                        <span style={{color: "red"}}><b>尚有錯誤或未填欄位</b></span>
                    }
                </div>
            </form>
        </div>
    );
}
