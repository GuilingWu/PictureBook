import {saveToken, storage} from './StorageUtil';
import URLUtil from './URLUtil';

const qs = require('qs');

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json;charset=utf-8',
};

/**
 * 请求 API 接口
 * @param {Object} options
 * @param {string} options.url  --接口地址
 * @param {string} options.method  --请求类型
 * @param {Object} options.headers --请求头
 * @param {Object} options.params --url参数
 * @param {Object} options.data --请求体数据
 */
export default function request({
  url,
  method,
  headers,
  params,
  data,
  access_token,
}) {
  let isOk;
  url = URLUtil(url);
  if (params) {
    url = url + '?' + paramsSerializer(params);
  }

  return new Promise((resolve, reject) => {
    console.log('=====fetch======'+url);

    fetch(url, {
      method,
      headers: {...DEFAULT_HEADERS, ...headers, Authorization: access_token},
      body: JSON.stringify(data),
    })
      .then(response => {
        isOk = !!response.ok;
        return response.json();
      })
      .then(responseData => {
        if (isOk && responseData.status === 'success') {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function requestWithToken(options) {
  return storage
    .load({
      key: 'accessToken',
      syncInBackground: false,
    })
    .then(result => {
      console.log('=====result==='+result);
      request({...options, access_token: result});
    });
}

export function refreshToken() {
  console.log('=====refresh token===');
  return storage
    .load({
      key: 'refreshToken',
    })
    .then(result => {
      console.log('=====refresh token== result='+result);
      return request({
        method: 'GET',
        url: 'refresh_token',
        params: {
          refresh_token: result,
        }
      }).then(({data}) => {
        console.log('====refreshToken== data====='+ data);
        saveToken(data);
        return data;
      });
    });
}

export function removeTokens() {
  storage.remove({
    key: 'accessToken'
  });
  storage.remove({
    key: 'refreshToken'
  });
}
/**
 * 请求参数序列化
 *
 * @param {Object} params - 请求参数
 * @returns {string}
 */
export function paramsSerializer(params) {
  return qs.stringify(params, {arrayFormat: 'brackets'});
}
