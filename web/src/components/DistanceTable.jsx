import React from 'react';

function DistanceTable({ points, selectedId }) {
  const selected = points.find((p) => p.id === selectedId) || null;

  if (!selected || points.length <= 1) {
    return (
      <div className="panel">
        <h2>거리 뷰</h2>
        <p className="hint">기준 포인트를 선택하면 다른 포인트와의 거리가 표시됩니다.</p>
      </div>
    );
  }

  const rows = points
    .filter((p) => p.id !== selected.id)
    .map((p) => ({
      id: p.id,
      label: p.label,
      distance: p.distanceFromSelected ?? NaN,
    }))
    .sort((a, b) => a.distance - b.distance);

  return (
    <div className="panel">
      <h2>거리 뷰</h2>
      <p className="hint">
        기준: <strong>{selected.label}</strong>
      </p>
      <table className="distance-table">
        <thead>
          <tr>
            <th>레이블</th>
            <th>거리</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.label}</td>
              <td>{row.distance.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DistanceTable;

