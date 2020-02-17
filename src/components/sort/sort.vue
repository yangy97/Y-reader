<template>
	<div>
		<mt-header fixed title="小说分类"></mt-header>
		<div class="sort-wrapper">
			<div class="sort-section" v-show="sort.male.length">
				<div>
					<!-- <van-icon name="fire"  color="#1989fa"/> -->
					<h4 class="margin-t">{{sortType.male.name}}</h4>
				</div>
				<div class="sort-list">
					<div class="sort-item" @click="gosortDetail(item,sortType.male.type)" v-for="(item ,index) in sort.male"
					 :key="index">
						<p class="name">{{item.name}}</p>
						<p class="count">{{item.bookCount}}</p>
					</div>
				</div>
			</div>
			<div class="sort-section" v-show="sort.female.length">
				<h4>{{sortType.female.name}}</h4>
				<div class="sort-list">
					<div class="sort-item" @click="gosortDetail(item,sortType.female.type)" v-for="(item ,key, index) in sort.female"
					 :key="index">
						<p class="name">{{item.name}}</p>
						<p class="count">{{item.bookCount}}</p>
					</div>
				</div>
			</div>
			<div class="sort-section" v-show="sort.picture.length">
				<h4>{{sortType.picture.name}}</h4>
				<div class="sort-list">
					<div class="sort-item" @click="gosortDetail(item,sortType.picture.type)" v-for="(item ,key, index) in sort.picture"
					 :key="index">
						<p class="name">{{item.name}}</p>
						<p class="count">{{item.bookCount}}</p>
					</div>
				</div>
			</div>
			<div class="sort-section" v-show="sort.picture.length">
				<h4>{{sortType.press.name}}</h4>
				<div class="sort-list">
					<div class="sort-item" @click="gosortDetail(item,sortType.press.type)" v-for="(item ,key, index) in sort.press"
					 :key="index">
						<p class="name">{{item.name}}</p>
						<p class="count">{{item.bookCount}}</p>
					</div>
				</div>
			</div>
		</div>
 <m-bottom></m-bottom>

	</div>
</template>
<script type="text/ecmascript-6">
	import {
		Indicator
	} from 'mint-ui'
	import {
		categories
	} from '@/components/api/api'

	export default {
		data() {
			return {
				sort: {
					male: [],
					female: [],
					picture:[],
					press:[]
				},
				sortType: {
					male: {
						name: '男生',
						type: 'male'
					},
					female: {
						name: '女生',
						type: 'female'
					},
					picture:{
						name:'动漫',
						type:'picture'
					},
					press:{
						name:'出版',
						type:'press'
					}
				}
			}
		},
		created() {
			this.getsort()
		},
		methods: {
			getsort() {
				Indicator.open('加载中...');
				categories().then((res) => {
					if (res.data.ok) {
						console.log(res.data)
						this.sort.male = res.data.male;
						this.sort.female = res.data.female;
						this.sort.picture=res.data.picture;
							this.sort.press=res.data.press;
						Indicator.close();
					}
				}, (error) => {
					Indicator.close();
					Indicator.open('网络错误');
					setTimeout(() => {
						Indicator.close();
					}, 1500)
				})
			},
			gosortDetail(item, key) {
				this.$router.push({
					path: '/sortdeatil/detail',
					query: {
						gender: key,
						major: item.name
					}
				})
			}
		}
	}
</script>
<style scoped lang="less">
	.sort-wrapper {
		&:last-child{
			margin-bottom: 7vh;
		}
		.sort-section {
			h4 {
				// margin-top: 20px;
				// margin: 0px;
				color: #666;
				font-weight: normal;
				line-height: 20px;
				   padding:25px 0 5px 10px;
				   font-size: 12px;
			}
.margin-t{
	margin-top:6vh;
}
			.sort-list {
				display: flex;
				width: 100%;
				flex-wrap: wrap;
			}

			.sort-item {
				flex: 1;
				width: 33.3333333%;
				max-width: 33.3333333%;
				min-width: 33.3333333%;
				text-align: center;
				// padding: 20px;
				// line-height:30px;
				border-top: 1px solid #f8f8f8;
				border-right: 1px solid #f8f8f8;
				border-bottom: 1px solid #f8f8f8;
				box-sizing: border-box;
			}
&:last-child{
	margin-bottom: 7.5vh;
}
			&:nth-child(3n+3) {
				border-right: none;
			}

			// &:nth-child(n+4) {
			// 	margin-top: -1px;
			// 	/* no*/
			// }

			.name {
				font-size: 12px;
				font-weight: 700;
				color: #333;
			}

			.count {
				font-size: 12px;
				color: #5BC;
			}
		}
	}
</style>
