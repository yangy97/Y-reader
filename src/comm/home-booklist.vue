<template>
	<div class="book-item" @click="goBook(book._id)">
		<div class="cover">
			<img :src="book.cover" alt="" class="img">
		</div>
		<div class="item-txt">
			<h4 class="name" style="font-size:13px;margin:0px">{{book.title}}</h4>
			<p class="author" style="font-size:9px;margin:0px">{{book.author}}</p>
			<p class="desc" style="font-size:9px;margin:0px">{{book.shortIntro}}</p>
			<p class="desc" v-show="isBList" style="font-size:9px;margin:0px">{{book.desc}}</p>
			<!-- <p class="cat" v-if="flag" style="font-size:9px;margin:0px">
				<span>{{book.minorCate}}</span>
				<span class="split">|</span>
				<span class="latelyFollower"> {{latelyFollower}}</span>
				万人气
			</p> -->
			<p class="cat" v-if="home">
			<span>{{book.minorCate}}</span>
				<span class="split">|</span>
				<span class="latelyFollower"> {{latelyFollower}}</span>
				万人气
			</p>
			<p class="cat" v-if="sort|isSearch">
				<span class=" latelyFollower"> {{latelyFollower}}</span>万人气
				<span class="split">|</span>
				<span class=" latelyFollower"> {{book.retentionRatio}}%</span>读者留存
			</p>
			<p class="cat" v-if="isBList">
				共{{book.bookCount}}本书
				<span class="split">|</span>
				<span > {{collectorCount}}</span>
			</p>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			book: {
				type: Object,
				default: null
			},
			flag: {
				type: Boolean,
				default: false
			},
			minorCate: {
				type: Boolean,
				default: true
			},
			home: {
				type: Boolean,
				default: false
			},
			isSearch: {
				type: Boolean,
				default: false
			},
			isBList: {
				type: Boolean,
				default: false
			},
			isLMore: {
				type: Boolean,
				default: false
			},
			sort: {
				type: Boolean,
				default: false
			}
			

		},
		computed: {
			latelyFollower() {
				return (this.book.latelyFollower / 10000).toFixed(1)
			},
			collectorCount() {
				if (this.book.collectorCount) {
					if (this.book.collectorCount > 10000) {
						return (this.book.collectorCount / 10000).toFixed(1) + '万人收藏'
					} else {
						return this.book.collectorCount + '人收藏'
					}
				} else {
					return 0 + '人收藏'
				}
			}

		},
		created() {},
		methods: {
			goBook(id) {
				if (this.isLMore) {
					return
				}
				//  if (this.isBList) {
				// 	this.$router.push({
				// 		path: `/bookLists/${id}`
				// 	});
				// }else {
					this.$router.push({
						path: `/book/${id}`
					});
				// }
			},
		}
	}
</script>

<style scoped lang="less">
	.book-item {
		display: flex;
		 height: 15vh;
		padding: 12px;
		border-bottom: 1px solid #ccc;
		max-width: 100vw;

	&:last-child {
			border-bottom: none;
			margin-bottom: 7.5vh;
			padding-bottom: 6vh;
		}

		.cover {
			display: flex;
			 // flex: 0 0 20%;
			 height: inherit;
			margin-right: 10px;
		
		
		}
	.cover .img {
			 height: 12vh;
			 	background:url('../assets/default.jpg') no-repeat;
				// width: 100%;
			}
		.item-txt {
			flex: 1;
			width: 75%;
			height: 15vh;

			.name {
				font-size: 15px;
				line-height: 28px;
				font-weight: 400;
				margin: 0;
				padding: 0;
			}

			h4,
			p {
				margin: 0px;
				padding: 0px;
			}


			.author {
				font-size: 12px;
				line-height: 12px;
				font-weight: 400;
				margin-bottom: 3px;
				padding: 0;
				color: #555;


			}

			.desc {
				// overflow: hidden;
				font-size: 13px;
				color: #999;
				line-height: 18px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.cat {
				color: #666;
			}

			.latelyFollower {
				color: red;
			}

		}
	}
</style>
