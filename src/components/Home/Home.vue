<template>
	<div>
		<!-- 头部 -->
	
		<div class="home-header">
			<mt-header fixed title="U-Reader"></mt-header>
		</div>
		<!-- 轮播图 -->
		<div class="banner">
			<mt-swipe :auto="4000">
				<mt-swipe-item v-for="(item,index) in lunbotu" :key="index">
					<img :src="item" alt="banner" class="banner-item">
				</mt-swipe-item>

			</mt-swipe>
		</div>
		<!-- 搜索 -->
		<div class="search">
			<div class="search-inner">
				<input type="search" v-model="value" @keyup.enter="goSearch" class="inputs" :placeholder="placeholder">
				<span @click="goSearch()" class="mui-icon mui-icon-search"></span>
			</div>
		</div>
	

			<!-- 内容 -->
			<div class="books" v-show="maleList.length">
				<div class="T">
					<div>
						<span class="title">
							男生最热榜
						</span>
					</div>
					<div class="see-more" @click="gorank" v-show="femaleList.length">
						查看更多>
					</div>
				</div>
				<div class="hblist">
					<h-blist v-for="book in maleList" :book="book" :key="book._id"  :home="home"></h-blist>
				</div>

			</div>

			<div class="books" v-show="maleList.length">
				<div class="T">
					<div>
						<span class="title">
							女神最喜爱

							
						</span></div>

					<span class="see-more" @click="gorank" v-show="maleList.length">
						查看更多>
					</span>
				</div>
				<div class="hblist">
					<h-blist v-for="book in femaleList" :book="book"  :key="book._id" :flag="flag" :home="home"></h-blist>
				</div>

			</div>

			<!-- 底部 -->
			<m-bottom></m-bottom>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	// import HelloWorld from '@/components/HelloWorld.vue'
	
	import {
		rank
	} from '@/components/api/api.js'
	import {
		Indicator,
		Lazyload
	} from 'mint-ui'
	// import H
	// import MBottom from '@/components/Bottom/Bottom.vue';
	// import HBlist from '@/comm/home-booklist.vue';
	export default {
		data() {
			return {
				value: '',
				placeholder: '元尊',
				current: 0,
				flag: true,
				home:true,
				book: true,
				
				lunbotu: [
					'http://statics.zhuishushenqi.com/recommendPage/156111180957475',
					'http://statics.zhuishushenqi.com/recommendPage/15313940968984',
					'http://statics.zhuishushenqi.com/recommendPage/156111169844287',
					'http://statics.zhuishushenqi.com/recommendPage/153139401503529',
				],
				maleList: [],
				femaleList: [],
				// components: {
				// 	MBottom,
				// 	HBlist

				// }
			}
		},
		created() {
			this.getBook();
		},
		methods: {
			getBook() {
				Indicator.open('加载中');
				rank('54d42d92321052167dfb75e3').then((res) => {
					if (res.data.ok) {
						this.maleList = this.imgrequest(res.data.ranking.books.slice(0, 5));
						console.log(this.maleList)
						Indicator.close()
					}
				}, (error) => {
					Indicator.close();
					Indicator.open('网络错误');
					setTimeout(() => {
						Indicator.close();
					}, 1500)
				});
				rank('54d43437d47d13ff21cad58b').then((res) => {
					if (res.data.ok) {
						this.femaleList = this.imgrequest(res.data.ranking.books.slice(0, 5));
						console.log(this.femaleList)
						Indicator.close()
					}
				}, (error) => {
					Indicator.close();
					Indicator.open('网络错误');
					setTimeout(() => {
						Indicator.close();
					}, 1500)
				})
			},
			//解决图片显示不出来的问题
			imgrequest(arr) {
				for (let i = 0; i < arr.length; i++) {
					arr[i].cover = unescape(arr[i].cover);
					arr[i].cover = arr[i].cover.replace("/agent/", "")
				}
				return arr
			},
			goSearch() {
				console.log(1234)
				if (!this.value) {
					this.$router.push({
						path: '/search',
						query: {
							val: this.placeholder
						}
					});
					// this.setSearch(this.placeholder)
				} else {
					this.$router.push({
						path: '/search',
						query: {
							val: this.value
						}
					});
					// this.setSearch(this.search)
				}

			},
			onChange(index) {
				this.current = index;
			},
			gorank() {
				this.$router.push({
					path: '/rank'
				})
			},
		}

	}
</script>
<!--<style src="vant/lib/index.css"></style>-->
<style lang="less" scoped>

.banner {
		margin-top: 6vh;
		width: 100%;
		height: 16vh;

		.banner-item {
			width: 100%;
			height: 100%;
		}
	}

	.search {
		.search-inner {
			position: relative;
			margin: 5px;

			.inputs {
				margin-top: 5px;
				background-color: #fff;
				border: 1px solid #999;
				padding-top: 10px;
			}

			.mui-icon-search {
				position: absolute;
				top: 8px;
				right: 8px;
				z-index: 100;
			}
		}
	}

	.T {
		display: flex;
		justify-content: space-between;
		margin-left: 15px;
		// text-align: center;
		// color: #39a9ed;
	}

	.books {
		// height: 100vh;
		width: 100vw;

		// overflow-y: scroll;
		.title {
			font-size: 15px;
			font-weight: 400;


		}

		.hblist {
			height: auto;
&:last-child{
	// margin-bottom: 40px;
}
		}
		.see-more {
			line-height: 0.5rem;
			// text-align: center;
			color: red;
			margin: 0 0.24rem;
			font-size: 12px;
			padding: 5px;
		}
	}
</style>
