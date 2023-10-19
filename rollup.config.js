// Since tsc keeps relative import extensionless, but ESM requires extensions.
// Rollup is needed to add the .js extension.

export default [
	{
		input: {
			tailwindify: 'dist/tailwindify.js',
			transform: 'dist/transform.js'
		},
		output: {
			dir: 'dist',
			format: 'es',
			exports: 'named',
			entryFileNames: '[name].js',
			preserveModules: true
		}
	}
];
