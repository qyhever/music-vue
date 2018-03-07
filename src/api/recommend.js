import jsonp from 'common/js/jsonp';
import {commonParams, options} from './config';
import axios from 'axios';

export function getRecommend() {
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