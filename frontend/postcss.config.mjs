/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    tailwindcss: {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
        autoprefixer: {
            flexbox: 'no-2009'
        },
        stage: 3,
        features: {
            'nesting-rules': true,
            'custom-properties': false
        },
    },
  }
};

export default config;