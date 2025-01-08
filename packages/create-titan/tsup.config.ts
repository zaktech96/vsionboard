import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  clean: true,
  bundle: true,
  splitting: false,
  dts: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
}); 