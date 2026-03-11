# text-embedding-visualizer

간단한 **로컬 JS 임베딩 엔진**으로 여러 언어의 문장을 벡터로 변환하고, 임베딩 간 거리를 **2D 맵으로 시각화**하는 데모입니다.  
GitHub Pages에 배포되어 브라우저만으로 실시간 실험이 가능합니다.

## 데모

- GitHub Pages URL (예시): `https://sangbumchoi.github.io/text-embedding-visualizer/`  
  - 최신 코드를 `main` 브랜치에 푸시하면 약간의 빌드/배포 시간이 지난 뒤 자동으로 갱신됩니다.

## 기능

- **실시간 임베딩 생성**: 텍스트를 입력하면 브라우저 내 JS만으로 바로 임베딩 벡터를 생성
- **여러 언어 비교**: 한국어, 영어, 일본어 등 다양한 문장을 각각 포인트로 추가
- **2D 맵 시각화**: 임베딩을 2차원으로 랜덤 프로젝션해 상대적인 거리 관계를 직관적으로 확인
- **거리 테이블**: 선택한 포인트를 기준으로 다른 포인트와의 코사인 거리를 숫자로 확인

## 로컬 개발

```bash
cd web
npm install
npm run dev
```

이후 브라우저에서 `http://localhost:5173` (또는 Vite가 출력하는 주소)를 열면 됩니다.

## 임베딩 방식 (매우 가벼운 JS)

- **입력 전처리**
  - 텍스트를 소문자 변환 후, 문자 단위로 순회
- **bag-of-n-grams**
  - 1-gram, 2-gram 문자/유니코드 n-gram을 추출
  - 각 n-gram을 단순 해시해 고정 차원(예: 64차원) 인덱스로 매핑
  - 해당 인덱스의 값을 1씩 증가시키는 방식으로 bag-of-ngrams 벡터 생성
- **정규화 & 거리**
  - 생성된 벡터를 L2 정규화하여 코사인 유사도/거리 계산이 가능하도록 함
- **2D 프로젝션**
  - 고정된 랜덤 2×D 행렬을 미리 생성
  - 임베딩 벡터에 이 행렬을 곱해 2차원 좌표 `(x, y)`를 얻는 **랜덤 프로젝션** 방식

이 과정은 모두 브라우저 내에서 동작하므로, 네트워크 요청이나 API 키가 필요 없습니다.

## GitHub Pages 배포

리포는 `main` 브랜치에 푸시될 때마다 GitHub Actions를 통해 자동으로 Pages에 배포되도록 설정되어 있습니다.

1. 코드 변경 및 커밋
2. `main` 브랜치에 푸시
3. GitHub Actions 워크플로(`.github/workflows/github-pages.yml`)가 실행
   - `web` 디렉터리에서 `npm install` 및 `npm run build`
   - `web/dist` 결과물을 Pages에 업로드 및 배포
4. GitHub Pages URL이 몇십 초~수 분 내에 업데이트

## 폴더 구조

- `web/`
  - `index.html` – 앱 엔트리 HTML
  - `vite.config.js` – Vite 및 GitHub Pages용 `base` 설정
  - `src/main.jsx` – React 엔트리
  - `src/App.jsx` – 전체 레이아웃 및 상태 관리
  - `src/styles.css` – 전체 UI 스타일
  - `src/embedding/embeddingEngine.js` – 로컬 JS 임베딩 & 2D 프로젝션 로직
  - `src/components/ControlPanel.jsx` – 텍스트/레이블 입력 패널
  - `src/components/EmbeddingScatterPlot.jsx` – 2D 임베딩 맵
  - `src/components/DistanceTable.jsx` – 포인트 간 거리 테이블

