import axios, { Canceler } from 'axios';

const server = {
  //  url: 'https://c-c.jiahuagame.com/lefantian-console/console',
   url: 'http://10.10.10.155:8200/jiahua-gamecenter/',
   auth: 'Xyz287454jY56345ok56V5423896v55T'
}

let cancel: Canceler;

const instance = axios.create({
  baseURL: server.url,
  timeout: 120000,
  cancelToken: new axios.CancelToken(function(c: Canceler) {
    cancel = c;
  })
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['token'] = 'mingame_center';

instance.interceptors.response.use(res => res, err=> {
  if(axios.isCancel(err)) {
    console.error('Request canceled', cancel);
  } else {
    // handle error
  }

  if(err.code === 'ECONNABORTED') {
    console.error('连接请求超时');
  }

  return Promise.reject(err);
})


export default instance;