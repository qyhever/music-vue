import jsonp from 'common/js/jsonp';
import {commonParams, options} from './config';
import axios from 'axios';

export function getSliderList() {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

  // 将commonParams和后面的对象合并到新对象param
	const param = Object.assign({}, commonParams, {
		platform: 'h5',
		uin: 0,
		needNewCode: 1,
		// _:1519443040277
	});

	return jsonp(url, param, options);
}

export function getDiscList() {
	const url = '/api/getDiscList';

  const param = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  });

  return axios.get(url, {
    params: param
  }).then(res => {
    return Promise.resolve(res.data);
  });
}