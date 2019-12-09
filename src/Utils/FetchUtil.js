import React, {Component} from 'react';

export function fetchData(url, callback, errorCallback) {
  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      callback(responseJson);
    })
    .catch(error => {
      errorCallback(error);
    });
}

export default class FetchUtil extends Component {}
