import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		// alias: [{ find: '@scr', replacement: '/src' }],
		alias: {
			'@src': resolve(__dirname, './src'), // will resolve to `/assets/`
		},
	},
	publicDir: './images',
});
