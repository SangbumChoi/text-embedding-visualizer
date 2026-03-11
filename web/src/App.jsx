import React, { useMemo, useState } from 'react';
import ControlPanel from './components/ControlPanel.jsx';
import EmbeddingScatterPlot from './components/EmbeddingScatterPlot.jsx';
import DistanceTable from './components/DistanceTable.jsx';
import { textToVector, projectTo2D, cosineDistance } from './embedding/embeddingEngine.js';

let nextId = 1;

function App() {
  const [points, setPoints] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const pointsWithDistance = useMemo(() => {
    if (!selectedId) return points;
    const selected = points.find((p) => p.id === selectedId);
    if (!selected) return points;
    return points.map((p) => {
      if (p.id === selected.id) {
        return { ...p, distanceFromSelected: 0 };
      }
      const d = cosineDistance(selected.vector, p.vector);
      return { ...p, distanceFromSelected: d };
    });
  }, [points, selectedId]);

  const handleAddPoint = ({ text, label }) => {
    const vector = textToVector(text);
    const { x, y } = projectTo2D(vector);
    const id = String(nextId);
    nextId += 1;

    setPoints((prev) => [...prev, { id, label, text, vector, x, y }]);
    if (!selectedId) {
      setSelectedId(id);
    }
  };

  const handleClearAll = () => {
    setPoints([]);
    setSelectedId(null);
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Text Embedding Visualizer</h1>
        <p>여러 언어/문장을 입력하고, 임베딩 기반 2D 거리 관계를 바로 확인해 보세요.</p>
      </header>
      <main className="app-main">
        <section className="left-column">
          <ControlPanel
            onAddPoint={handleAddPoint}
            onClearAll={handleClearAll}
            count={points.length}
          />
        </section>
        <section className="right-column">
          <EmbeddingScatterPlot
            points={pointsWithDistance}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <DistanceTable points={pointsWithDistance} selectedId={selectedId} />
        </section>
      </main>
    </div>
  );
}

export default App;

