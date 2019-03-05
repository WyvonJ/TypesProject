import axios from './config';

const preUrl:string = '';
function getCurrentTime() {
  function convertTime(time: any) {
      if (time <= 9)
          return '0' + time;
      return time;
  }

  var date = new Date();
  return date.getFullYear() + '-' + convertTime(date.getMonth() + 1) + '-' + convertTime(date.getDate()) + 'T' + convertTime(date.getHours()) + ':' + convertTime(date.getMinutes()) + ':' + convertTime(date.getSeconds() + '.' + date.getMilliseconds() + 'Z');
}
const homepage = {
  getHomePageList: (params: any) => {
    return axios.get(`${preUrl}http://www.baidu.com`, { params });
  },
  postHomePageList: (params: any) => {
    return axios.post(`${preUrl}/activity`, params);
  },
  putHomePageList: (params: any) => {
    return axios.put(`${preUrl}/activity`, params);
  }
}


export {
  homepage
}