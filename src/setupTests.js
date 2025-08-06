require('whatwg-fetch');

// Polyfill for global fetch in Node.js test environment
global.fetch = global.fetch || require('whatwg-fetch').fetch;
