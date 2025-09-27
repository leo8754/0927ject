import React from 'react';

function DiagnosisResult({ result }) {
  const handleDownload = (format) => {
    const content = format === 'json'
      ? JSON.stringify(result, null, 2)
      : `分數: ${result.score}\n建議: ${result.suggestions.join(', ')}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `diagnosis_result.${format}`;
    link.click();
  };

  return (
    <div className="card">
      <h2>健診結果</h2>
      <p>分數：{result.score}</p>
      <ul>
        {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
      <button onClick={() => handleDownload('json')}>下載 JSON</button>
      <button onClick={() => handleDownload('txt')}>下載 TXT</button>
    </div>
  );
}

export default DiagnosisResult;