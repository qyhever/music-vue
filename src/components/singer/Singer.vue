<template>
  <div class="singer" ref="singer">
		<!-- 1.4 使用listview组件 -->
		<list-view :data="singerList"></list-view>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer';
import {ERR_OK} from 'api/config';
import ListView from 'base-components/listview/BaseListView';
import Singer from 'common/js/singer';

const HOT_NAME = '热门';
const HOT_SINGER_LEN = 10;
export default {
	components: {ListView},
	data() {
		return {
			singerList: []
		};
	},
  created() {
		// 1.1 调用
		this._getSingerList();
	},
	methods: {
		// 1.0 获取歌手列表数据
		_getSingerList() {
			getSingerList().then(res => {
				if (res.code === ERR_OK) {
					// this.singerList = res.data.list;
					// 1.3 处理数据格式
					this.singerList = this._normalizeSinger(res.data.list);
        }
			});
		},
		// 1.2 处理数据格式
		_normalizeSinger(list) {
			let map = {
				hot: {
					title: HOT_NAME,
					items: []
				}
			};
			list.forEach((item, index) => {
				if (index < HOT_SINGER_LEN) {
					map.hot.items.push(new Singer({
						id: item.Fsinger_mid,
						name: item.Fsinger_name
					}));
				}
				const key = item.Findex; // Findex是字母
				if (!map[key]) {
					map[key] = {
						title: key,
						items: []
					};
				}
				map[key].items.push(new Singer({
					id: item.Fsinger_mid,
					name: item.Fsinger_name
				}));
			});

			// 处理map，变成有序列表
			let ret = [];
			let hot = [];
			for (let k in map) {
				let val = map[k];
				if (val.title.match(/[a-zA-Z]/)) {
					ret.push(val);
				} else if (val.title === HOT_NAME ) {
					hot.push(val);
				}
			}
			ret.sort((a, b) => {
				return a.title.charCodeAt(0) - b.title.charCodeAt(0);
			});
			return [...hot, ...ret];
		}
	}
}
</script>

<style scoped lang="stylus">
.singer {
	position: fixed;
	top: 88px;
	bottom: 0;
	width: 100%;
}
</style>