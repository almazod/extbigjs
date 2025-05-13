import { defineConfig } from 'tsup';

export default defineConfig([
	{
		clean: true,
		entry: ['src/index.ts'],
		format: ['cjs', 'esm'],
		target: 'esnext',
		outDir: 'dist'
	},
	{
		entry: ['src/index.ts'],
		format: ['esm'],
		target: 'esnext',
		outDir: 'dist',
		dts: { resolve: true, only: true }
	}
]);
