import {userData} from '../Utils/StorageUtil';

let userDataInfo = null;
export function loadUserInfo(data) {
  if (userDataInfo) return;
  if(data){
    userDataInfo = new UserData(data);
  }else{
    userData(result => {
      if (result) {
        userDataInfo = new UserData(result);
      }
    });
  }
}
export function getUserInfo() {
  userDataInfo.getInfo();
  return userDataInfo;
}
export default function UserData(data) {
  this.name = data.name;
  this.id = data.id;
  this.ename = data.ename;
  this.sex = data.sex;
  this.birth = data.birth;
  this.imagePath = data.imagePath;
  this.newPath = data.newPath;
  this.getInfo();
}

UserData.prototype.getInfo = function() {
  console.log(
    `name: ${this.name},id: ${this.id},ename: ${this.ename},sex: ${
      this.sex
    },birth: ${this.birth},imagePath: ${this.imagePath},newPath: ${
      this.newPath
    }`,
  );
};
UserData.prototype.isSame = function(data) {
  this.getInfo();
  data.getInfo();
  if (
    this.name == data.name &&
    this.id == data.id &&
    this.ename == data.ename &&
    this.sex == data.sex &&
    this.birth == data.birth &&
    this.imagePath == data.imagePath &&
    this.newPath == data.newPath
  ) {
    return true;
  }
  return false;
};
