import {URLPre} from '../Configs/PathConfig';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import { from } from 'rxjs';

export default function URLPath(str) {
  return URLPre + str;
}

export function imageSource(str){
  let dirs =
    Platform.OS === 'ios'
      ? RNFS.LibraryDirectoryPath
      : RNFS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
  return `${dirs}${str}`;
}
export function localImageSource(str){
  return str;
}