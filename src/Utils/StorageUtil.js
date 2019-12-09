import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
import {refreshToken} from './RequestUtil';

export const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  sync: {
    accessToken(params) {
      let {resolve, reject} = params;
      refreshToken()
        .then(data => resolve && resolve(data.access_token))
        .catch(error => reject && reject(error));
    },
  },
});

/**
 * 客户端缓存保存 token数据
 * @param {object} data  登陆成功后服务器返回的数据
 * @param {string} data.access_token
 * @param {string} data.refresh_token
 * @param {number} data.expires_in
 */
export function saveToken({access_token, refresh_token, expires_in}) {
  console.log('====saveToken== access_token=====' + access_token);
  console.log('====saveToken== refresh_token=====' + refresh_token);
  storage.save({
    key: 'accessToken',
    data: access_token,
    expires: 1000 * 10, //测试自动刷新token 10s后过期
    // expires: 1000*(expires_in-120) //access_token 有效期 2 小时，保险起见客户端减少 2 分钟
  });
  storage.save({
    key: 'refreshToken',
    data: refresh_token,
    expires: 1000 * 3600 * 24 * 30, //refresh_token 保存 30 天
  });
}
export function removeToken() {
  storage.remove({
    key: 'accessToken',
  });
  storage.remove({
    key: 'refreshToken',
  });
}

export function saveUser({name, id, ename, sex, birth, imagePath}) {
  console.log('====saveUser== name=====' + name);
  console.log('====saveUser== sex=====' + sex);
  console.log('====saveUser== birth=====' + birth);
  console.log('====saveUser== ename=====' + ename);
  storage.save({
    key: 'userDefault',
    data: {
      name: name,
      sex: sex,
      birth: birth,
      ename: ename,
      id: id,
      imagePath: imagePath,
    },
  });
  // DeviceStorage.save('name', name);
  // DeviceStorage.save('sex', sex);
  // DeviceStorage.save('birth', birth);
  // DeviceStorage.save('ename', ename);
}

export function userData(callback) {
  // console.log('=====userData===');
  storage
    .load({
      key: 'userDefault',
    })
    .then(result => {
      // console.log('=====userData===' + result.birth);
      callback(result);
    });
}

export default class DeviceStorage {
  static get(key) {
    return AsyncStorage.getItem(key).then(value => {
      const jsonValue = JSON.parse(value);
      return jsonValue;
    });
  }
  static save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }
  static update(key, value) {
    return DeviceStorage.get(key).then(item => {
      value =
        typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }
  static delete(key) {
    return AsyncStorage.removeItem(key);
  }
}
