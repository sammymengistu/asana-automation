const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: 0,
    use:{
        headless: false,
        baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
    },
});