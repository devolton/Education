import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // server:{
  //   host: '192.168.0.111',
  //   port:5173
  // },
  plugins: [react()],
  base: "/metronic8/react/demo1/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
})
