import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// GitHub Pages 배포를 고려한 base 설정
// GitHub 리포 이름이 text-embedding-visualizer 라고 가정합니다.
export default defineConfig({
  plugins: [react()],
  base: '/text-embedding-visualizer/',
});

