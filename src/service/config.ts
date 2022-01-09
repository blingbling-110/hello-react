const devBaseURL = 'https://httpbin.org'
const proBaseURL = 'https://production.org'
export const baseURL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL
export const timeout = 8000
