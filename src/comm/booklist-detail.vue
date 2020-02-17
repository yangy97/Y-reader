<template>
	<div class="booklist-item">
		<mt-header title="作者详情" class="book-header">
			<div slot="left" @click="$router.back(-1)">
				<mt-button icon="back">返回</mt-button>
			</div>
		</mt-header>
		<div class="author" v-show="author.nickname">
			<div class="author-top">
				<div class="author-img">
					<img :src="img+author.avatar" alt=""></div>

				<div class="author-right">
					<div class="name">{{author.nickname}}</div>
					<div class="time">{{upDate <= 0 ? '刚刚更新' : `${upDate}小时前更新`}}
					</div>
				</div>
			</div>
			<div class="author-desc">
				<h1>{{title}}</h1>
				<div class="desc">{{desc}}</div>
			</div>
		</div>
		<div class="books" v-show="booklist.length>0">	
				<div class="books-out" @click="goBooks(item.book._id)" v-for="item in booklist">
					<div class="book-inner" >
						<div class="books-img">
							<img :src="imgEscpe(item.book.cover)" alt="">
						</div>
						<div class="book-right">
							<h1 >{{item.book.title}}</h1>
							<div class="book-data" style="font-size:12px">
								<span>{{item.book.author}}</span> | <span>{{item.book.cat}}</span> | <span class="latelyFollower">{{latelyFollower(item.book.latelyFollower)}}</span>万人气
							</div>
						</div>
					</div>
					<div class="book-out-comment">{{item.comment}}</div>
				</div>
					
				
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import {
		bookListsInfo
	} from '@/components/api/api'
	export default {
		data() {
			return {
				booklist: [],
				title: '',
				desc: '',
				author: {},
				img: 'http://statics.zhuishushenqi.com/',
				upDate: ''
			}
		},
		computed: {},
		created() {
			this.getBooksList(this.$route.params.id)
		},
		methods: {
			latelyFollower(lately) {
				return (lately / 10000).toFixed(1)
			},
			imgEscpe(url) {
				return unescape(url.replace("/agent/", ""));

			},
			goBooks(id) {
				this.$router.push({
					path: `/book/${id}`
				});
			},
			getBooksList(id) {
				bookListsInfo(id).then((res) => {
					console.log(res)
					this.upDate = this.moment(res.data.bookList.updated);
					this.author = res.data.bookList.author;
					this.desc = res.data.bookList.desc;
					this.title = res.data.bookList.title;
					this.booklist = res.data.bookList.books
				})
			},
			imgrequest(arr) {
				for (let i = 0; i < arr.length; i++) {
					arr[i].cover = unescape(arr[i].cover);
					arr[i].cover = arr[i].cover.replace("/agent/", "")
				}
				return arr
			},
			moment(time) {
				let currentTime = Math.round(new Date() / 1000);
				this.upDate = time.replace("T", ' ').replace("Z", ' ');
				this.upDate = Date.parse(new Date(this.upDate)) / 1000;
				return Math.floor((currentTime - this.upDate) % 86400 / 3600)
			},
		}
	}
</script>
<style scoped lang="less">
	.booklist-item {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		z-index: 100;
		background: #fff;
		overflow-y: scroll;
		max-width: 750px;
		/*no*/
		margin: 0 auto;

		.book-header {
			height: 35px;
			line-height: 35px;
			font-size: 15px;
			background: #409eff;
			width: 100%;
		}

		.author {
			padding: 15px;
			// position: relative;
			box-sizing: border-box;
			border-bottom: 1px solid #ebebeb;

			/*no*/
			.author-top {
				height: 4vh;
				// padding: 0 30px 15px 5px;
				display: flex;
				justify-content: flex-start;

				.author-img>img {
					width: 40px;
					height: 40px;
					// position :absolute;
					margin-right: 12px;
				}

				.author-right {
					.name {
						font-size: 14px;
						font-weight: 600;
					}

					.time {
						font-size: 14px;
						font-weight: 400;
						color: #999;
					}
				}
			}

			.author-desc {
				display: flex;
				margin-top: 1.1vh;
				flex-direction: column;

				h1 {
					line-height: 50px;
					height: 40px;
					font-size: 15px;
				}

				.desc {
					line-height: 20px;
					color: #999;
				}
			}
	}
			.books {
				height: 25vh;
				width: 100vw;
box-sizing: border-box;

				.books-out {
          display: flex;
          flex-direction: column;
  // height: 20vh;
padding: 15px;
				// width: 100vw;
				.book-inner{
          display: flex;
          flex-direction: row;
          .books-img{
            // flex: 0 0 20%;
            img{
 height: 70px !important;
            width: 50px !important;
            }
           
          }
          .book-right{
            margin-left: 10px;
            h1{
              font-size:16px;
            }
            .book-data{
              font-size: 12px;
              color:#999;
              .latelyFollower{
                color: red;
              }
            }
          }
        }
        .book-out-comment{
          height: 10vh;
          // line-height: 11vh;
padding-top: 1vh;
color: #999;
font-size: 11px;
overflow: hidden;
  border-bottom: #ebebeb 1px solid;
        }
				}
			}

	
	}
</style>
