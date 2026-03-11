import React from 'react';

function computeBounds(points) {
  if (points.length === 0) {
    return { minX: -1, maxX: 1, minY: -1, maxY: 1 };
  }
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  points.forEach((p) => {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  });
  if (minX === maxX) {
    minX -= 1;
    maxX += 1;
  }
  if (minY === maxY) {
    minY -= 1;
    maxY += 1;
  }
  return { minX, maxX, minY, maxY };
}

function scale(value, min, max, size, padding) {
  const range = max - min || 1;
  return padding + ((value - min) / range) * (size - 2 * padding);
}

function EmbeddingScatterPlot({ points, selectedId, onSelect }) {
  const width = 100;
  const height = 100;
  const padding = 8;
  const { minX, maxX, minY, maxY } = computeBounds(points);

  return (
    <div className="panel">
      <h2>2D 임베딩 맵</h2>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="scatter-plot"
        role="img"
        aria-label="임베딩 2D 시각화"
      >
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          rx="4"
          ry="4"
          className="scatter-bg"
        />
        {points.map((p) => {
          const cx = scale(p.x, minX, maxX, width, padding);
          const cy = scale(p.y, minY, maxY, height, padding);
          const isSelected = p.id === selectedId;
          return (
            <g
              key={p.id}
              transform={`translate(${cx}, ${cy})`}
              onClick={() => onSelect(p.id)}
              className="scatter-point-group"
            >
              <circle
                r={isSelected ? 3.5 : 2.5}
                className={isSelected ? 'scatter-point selected' : 'scatter-point'}
              />
              <text
                x={4}
                y={-4}
                className="scatter-label"
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="hint">포인트를 클릭하면 아래 거리 테이블에서 기준이 됩니다.</p>
    </div>
  );
}

export default EmbeddingScatterPlot;

