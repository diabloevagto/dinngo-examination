const baseName = 'web';

module.exports = {
  development: {
    REACT_APP_BASE_NAME: baseName,
    REACT_APP_API_URL: 'https://api.github.com',
  },
  test: {
    GENERATE_SOURCEMAP: false,
    REACT_APP_BASE_NAME: baseName,
    PUBLIC_URL: `http://127.0.0.1/${baseName}`,
    REACT_APP_API_URL: 'https://api.github.com',
  },
  production: {
    GENERATE_SOURCEMAP: false,
    REACT_APP_BASE_NAME: baseName,
    PUBLIC_URL: `http://127.0.0.1/${baseName}`,
    REACT_APP_API_URL: 'http://127.0.0.1:8080/api',
  },
};