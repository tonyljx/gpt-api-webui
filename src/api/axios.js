import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'


const myAxios = axios.create({
  baseURL: isDev ? '' : 'https://api.runningpig.top'
})

myAxios.defaults.withCredentials = true;


export default myAxios;