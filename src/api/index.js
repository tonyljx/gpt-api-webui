// api.js
// 
const isDev = process.env.NODE_ENV === 'development'
export const apiUrl = isDev ? '' : 'https://api.runningpig.top'
export default apiUrl;