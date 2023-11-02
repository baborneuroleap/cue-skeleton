// config.js
const env = 'dev';

const dev = {
    baseUrl: window.BASE_API_URL === undefined ? 'http://localhost:7000' : window.BASE_API_URL,
    // baseUrl: 'http://localhost:7000',
    env: env,
}

const prod = {
    baseUrl: 'https://test.mydomain.com',
    env: env,
}

const config = {
    dev,
    prod,
}

export default config[env]

export const testValue = 123000000

