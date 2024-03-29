import axios from 'axios'
import router from '@/router';
import { Message, Loading } from 'element-ui'
import store from '@/store'

const env = process.env.NODE_ENV;
let baseURL = '';
// 默认是本地环境
if(env==='production'){  // 生产环境
  baseURL = 'http://47.114.61.247:18081';
}else if(env==='development'){ // 测试环境
  baseURL = 'http://121.196.18.151:18081';
}else{  // 本地环境
  baseURL = 'http://121.196.18.151:18081';
}
// 创建axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 5000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 503:Token 过期了;
      if (res.code === 503) {
          store.dispatch('user/resetToken').then(() => {
            router.push({path:'/login' ,query: {url:location.hostname}});
            location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
      let loading = Loading.service({ fullscreen: true,background: 'rgba(0, 0, 0, 0.4)',customClass: 'loadingImg' });
      setTimeout(() => {
        loading.close()
      }, 400)
      return
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
