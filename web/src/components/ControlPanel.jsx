import React, { useState } from 'react';

function ControlPanel({ onAddPoint, onClearAll, count }) {
  const [text, setText] = useState('');
  const [label, setLabel] = useState('');

  const handleAdd = () => {
    if (!text.trim()) return;
    onAddPoint({
      text,
      label: label.trim() || `point-${count + 1}`,
    });
    setText('');
    setLabel('');
  };

  return (
    <div className="panel">
      <h2>입력</h2>
      <label className="field">
        <span>텍스트 / 문장</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="예: 안녕하세요, Hello, こんにちは ..."
        />
      </label>
      <label className="field">
        <span>레이블 (언어/메모)</span>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="예: Korean, English, Japanese ..."
        />
      </label>
      <div className="panel-actions">
        <button type="button" onClick={handleAdd} disabled={!text.trim()}>
          포인트 추가
        </button>
        <button type="button" onClick={onClearAll} disabled={count === 0}>
          모두 지우기
        </button>
      </div>
      <p className="hint">현재 포인트 수: {count}</p>
    </div>
  );
}

export default ControlPanel;

