import path  from 'path'
import { defineConfig } from 'vite'

const config = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'datepicker.js'),
      name: 'datepicker',
      fileName: 'datepicker'
    },
  }
});

export default config;
