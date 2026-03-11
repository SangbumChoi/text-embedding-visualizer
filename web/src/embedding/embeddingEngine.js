const DEFAULT_DIM = 64;

function l2Normalize(vec) {
  let sumSq = 0;
  for (let i = 0; i < vec.length; i += 1) {
    sumSq += vec[i] * vec[i];
  }
  const norm = Math.sqrt(sumSq) || 1;
  const out = new Float32Array(vec.length);
  for (let i = 0; i < vec.length; i += 1) {
    out[i] = vec[i] / norm;
  }
  return out;
}

function simpleHash(str, dim) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  // >>> 0 으로 uint32 변환 후 dim으로 모듈러
  return (h >>> 0) % dim;
}

export function textToVector(text, { dim = DEFAULT_DIM } = {}) {
  const cleaned = (text || '').trim();
  const vec = new Float32Array(dim);

  if (!cleaned) {
    return vec;
  }

  // 1-gram, 2-gram 기반 bag-of-ngrams
  const normalized = cleaned.toLowerCase();
  const length = normalized.length;

  for (let i = 0; i < length; i += 1) {
    const ch = normalized[i];
    const idx1 = simpleHash(ch, dim);
    vec[idx1] += 1;

    if (i < length - 1) {
      const bigram = normalized.slice(i, i + 2);
      const idx2 = simpleHash(bigram, dim);
      vec[idx2] += 1;
    }
  }

  return l2Normalize(vec);
}

function createRandomProjection(dim, seed = 42) {
  let x = seed >>> 0;
  function next() {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    x >>>= 0;
    return x / 0xffffffff;
  }

  const proj = new Float32Array(2 * dim);
  for (let i = 0; i < 2 * dim; i += 1) {
    const r = next();
    proj[i] = r * 2 - 1;
  }
  return proj;
}

const GLOBAL_PROJECTION = createRandomProjection(DEFAULT_DIM);

export function projectTo2D(vector) {
  const dim = vector.length;
  const proj = GLOBAL_PROJECTION;
  let x = 0;
  let y = 0;
  for (let i = 0; i < dim; i += 1) {
    x += vector[i] * proj[i];
    y += vector[i] * proj[i + dim];
  }
  return { x, y };
}

export function cosineDistance(a, b) {
  if (a.length !== b.length) return NaN;
  let dot = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
  }
  return 1 - dot;
}

