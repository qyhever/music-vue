import originJsonp from 'jsonp';

export default function jsonp(url, param, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + handleParam(param);

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

export function handleParam(data) {
  let result = '';
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    result += '&' + k + '=' + encodeURIComponent(value);
  }
  return result ? result.substring(1) : ''; // name=zs&age=18
}
