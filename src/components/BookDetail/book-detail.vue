<template>
	<div>
		<div class="books-detail">
			<mt-header :title="title" class="book-header">
				<div slot="left" @click="$router.back(-1)">
					<mt-button icon="back">返回</mt-button>
				</div>
			</mt-header>
			<div class="book-detail" v-show="book.title">
				<div class="cover">
					<img :src="imgrequest(book.cover)" alt="">
				</div>
				<div>
					<div class="h-title">{{book.title }}</div>
					<div class="info">
						<span class="author">{{book.author}}|</span> 
						 <span class="minorcate">{{book.minorCate || 0}}|</span>
						 <span class="wordcount">{{latelyCount(book.wordCount || 0)}}</span>
					</div>
					<div>
						<span class="update"> {{upDate > 1 ? upDate + "小时前" : upDate * 60 + "分钟前"}}更新</span>
					<p class="lastChapter">{{book.lastChapter}}</p> </div>
					
					
				
				</div>
			</div>
			<div class="read-link" v-show="book.title">
				<div class="sj" @click="setBookLocalStorage()">{{flag ? '撤出书架' : '加入书架'}}</div>
				<div class="read" @click="goReadBooks(),setUserLocalStorage()">开始阅读</div>
			</div>
			<div class="reader-data">
				<p class="item">
					<span class="title-t">追人气</span>
					<span class="count">{{latelyFollower(book.latelyFollower) || 0}}万</span>
				</p>
				<p class="item">
					<span class="title-t">读者存留率</span>
					<span class="count">{{book.retentionRatio || 0}}%</span>
				</p>
				<p class="item">
					<span class="title-t">日更字数/天</span>
					<span class="count">{{book.serializeWordCount || 0}}</span>
				</p>
			</div>
			<div class="introduction">
				{{book.longIntro}}
			</div>

			<div class="comment">
				<p class="comment-title">热门评论</p>
				<ul>
					<li v-for="item in comments" class="comment-li">
						<div class="comment-div">
							<div class="cover">
								<img :src="imgUrl+item.author.avatar" alt="">
							</div>
							<div class="right">
								<p class="name">{{item.author.nickname}}</p>
								<p class="title">{{item.title}}</p>
								<p class="content">{{item.content}}</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import {
		mapMutations
	} from 'vuex'
	import {
		book,
		bookComments
	} from '../api/api'
	export default {
		name:'book-detail',
		data() {
			return {
				title: '小说详情',
				book: {},
				upDate: 0,
				comments: [],
				sUrl: 'http://statics.zhuishushenqi.com',
				flag: false,
				fontSize: 18,
				fontColor: '#5c5d58',
				background: '#eee6dd',
				readePattern: 0,
				pagingPattern: 0,
			}
		},
		computed: {
			imgUrl() {
				return this.sUrl
			},
		},
		created() {
			this.getBook(this.$route.params.id);
			this.getComments(this.$route.params.id)
		},
		watch: {
			'$route': function(newVal, oldVal) {
				this.getBook(newVal.params.id);
				this.getComments(newVal.params.id)
			}
		},
		methods: {
			latelyFollower(lately) {
				if (lately > 10000) {
					return (lately / 10000).toFixed(1)
				} else {
					return lately
				}

			},
			latelyCount(count) {
				if (count > 10000) {
					return (count / 10000).toFixed() + '万字'
				} else {
					return count + '字'
				}
			},
			getBook(id) {
				book(id).then((res) => {
					this.book = res.data;
					this.upDate = this._time(this.book.updated);
					this.isFlag()
					this.setBook(this.book)
				})
			},
			imgrequest(str) {
				str = unescape(str).replace("/agent/", "")
				return str
			},
			_time(time) {

				let currentTime = Math.round(new Date() / 1000);
				time = new Date(time).getTime() / 1000;
				let timer = Math.floor((currentTime - time) % 86400 / 3600);
				return timer
			},
			getComments(id) {
				bookComments(id).then((res) => {
					if (res.data.ok) {
						this.comments = res.data.reviews
					}
				});
			},
			isFlag () {
			  // 返回本地是否缓存（加入书架）
			  let localShelf = JSON.parse(window.localStorage.getItem('book'))
			  this.flag = !!(localShelf && localShelf[this.book._id])
			},
			setBookLocalStorage(){
			  let localShelf = JSON.parse(window.localStorage.getItem('book')) ? JSON.parse(window.localStorage.getItem('book')) : {};
			  if (this.flag) {
			    delete localShelf[this.book._id];
			    window.localStorage.setItem('book', JSON.stringify(localShelf))
			    this.flag = !this.flag
			  } else {
			    localShelf[this.book._id] = {
			      cover: this.book.cover,
			      title: this.book.title,
				  id: this.book._id,
				  author:this.book.author,
				  lastChapter:this.book.lastChapter,
			      chapterIndexCache: 0,
			      bookSource: 0,
			      pageIndexCache: 0,
			    };
			    window.localStorage.setItem('book', JSON.stringify(localShelf))
			    this.flag = !this.flag
			  }
			},

			//将用户设置进行缓存
			setUserLocalStorage(){
			  let localShelf = JSON.parse(window.localStorage.getItem('userSet')) ? JSON.parse(window.localStorage.getItem('userSet')) : {};
			  if (localShelf.color) {
			    return
			  } else {
			    localShelf = {
			      fontSize: this.fontSize,
			      background: this.background,
			      color: this.fontColor,
			      readePattern: this.readePattern,
			      pagingPattern: this.pagingPattern,
			    };
			    window.localStorage.setItem('userSet', JSON.stringify(localShelf));

			  }

			},

			goReadBooks() {
				this.$router.push({
					path: `/read/${this.$route.params.id}/`
				});
			},
			...mapMutations({
			  setBook: 'SET_BOOK'
			})
		},
	}
</script>

<style scoped lang="less" >
	
	.books-detail {
			
			position: fixed;
			z-index: 100;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: #fff;
			width: 100%;
			overflow-y: scroll;
			// max-width: 750px;
			
			margin: 0 auto;
		

		.book-header {
			height: 40px;
			line-height: 35px;
			font-size: 16px;
			background: #409eff;
		}

		.book-detail {
			display: flex;
		padding:15px 15px 20px 30px;

			.cover {
				flex: 0 0 100px;
				height: 20vh;
				margin-right: 10px;
				overflow: hidden;
				background: url('../../assets/default.jpg') no-repeat;
				// background-position: 50%;
				background-size: 100%;

				img {
					max-width: 100%;
				}
}
					.h-title {
						height: 20px;
						font-size: 13px;
						color:black;
						font-weight: 500;
						margin-bottom: 5px;
					}
.author,.wordcount,.minorcate,.update,.lastChapter{
	height: 20px;
	font-size: 13px;
	line-height: 25px;
	color:#999;
	margin-bottom: 5px;
}
.lastChapter{
		height: 20px;
	font-size: 13px;
	line-height: 25px;
	color:#999;
	
}
	}

		.read-link {
			display: flex;
			padding: 0 30px 30px 30px;
			font-size: 15px;

			div {
				flex: 1;
				text-align: center;
				line-height: 40px;
				height: 40px;
			}

			.sj {
				border: 1px solid #409eff;
				color: #409eff;
				box-sizing: border-box;
				margin-right: 10px;
			}

			.read {
				background: #409eff;
				color: #fff;
				margin-left: 10px;
			}
		}

		.reader-data {
			padding: 15px 15px 10px 15px ;
			border-top: 1px solid #ebebeb;
			border-bottom: 1px solid #ebebeb;
			box-sizing: border-box;
			font-size: 0;

			.item {
				display: inline-block;
				width: 33%;
				text-align: center;
				vertical-align: middle;
			}

			span {
				font-size: 12px;
			}

			/* no*/
			.title-t {
				display: block;
				font-size: 13px;
				/* no*/
				color: #999;
			
			}
			.count {
				display: block;
				font-size: 11px;
				/* no*/
				color: black;
			
			}
		}

		.introduction {
			width: 100%;
			padding: 22px;
			box-sizing: border-box;
			font-size: 8px;
			color: #999;
			line-height: 28px;
			overflow: hidden;
			text-align: justify;
			border-bottom: 1px solid #ebebeb;
		}
.comment{
  padding: 10px;
  .comment-title{
height: 30px;
line-height: 30px;
  }
  .comment-li{
    padding: 5px 0;
			border-bottom: 1px solid #ebebeb;

  }
  .comment-div{
    display: flex;
    justify-content: space-around;
  }
  .cover{
    flex:0 0 18%;
     width: 50px;
     height: 50px;
    //  background: url('../../assets/default.jpg') no-repeat;
     border-radius: 50px;
    //  padding: 15px;
     img{
        // flex:0 0 15%;
         width: 50px;
     height: 50px;
border-radius: 50px;
     }
  }
  .right{
    flex:0 0 80%;
.name{
  font-size: 13px;
  color: #555;
  margin-bottom: 0px
}
.title{
  color: black;
  font-size: 8px;
}
.content{
  font-size: 10px;
  color: #999;
}
  }

}
	
	}
</style>
