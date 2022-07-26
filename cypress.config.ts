import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'mpm8m6',
  e2e: {
    baseUrl: 'http://localhost:4200',
  },
});
