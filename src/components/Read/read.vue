<template>
	<div>
		<div class="book" ref="wrapper" @click="setRead($event)" :style="{color:fontColor,background:background}">
			<div v-if="pagingPattern===0" class="books-con" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
			 infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
				<div class="book-content" ref="content">
					<h1 class="book-title" :style="{fontSize:fontSize*1.2+'px'}">{{bookContent.title}}</h1>
					<div class="book-inner" :style="{fontSize:fontSize+'px'}">{{bookContent.content}}</div>

				</div>
				<div class="loadMore" style="text-align: center" v-show="moreLoading">
					<mt-spinner type="triple-bounce" color="#409eff"></mt-spinner>
				</div>
			</div>
			<div class="bootPage" @click="setBootPage" v-if="bootPage===0">
				<div class="b-item bootPage-left">
					<div class="center">
						<i class="fa fa-angle-left"></i><span>点击左侧翻页</span>
					</div>
				</div>
				<div class="b-item bootPage-center">
					<div class="center" style="text-align: center">
						呼出菜单
					</div>
				</div>
				<div class="b-item bootPage-right">
					<div class="center" style="text-align: right">
						<span>点击右侧翻页</span><i class="fa fa-angle-right"></i>
					</div>
				</div>
			</div>
			<div class="read-content" v-if="pagingPattern===1">
				<p class="book-title" style="padding: 10px">{{bookContent.title}}</p>
				<div class="read-article">
					<section class="read-section" :style="styleObject">
						<div class="read-section-inner" :style="{columns:clWidth-20+'px',columnGap:10+'px'}" ref="bookInner" id="bookInner">
							<h1 class="book-title" :style="{fontSize:fontSize*1.2+'px'}">{{bookContent.title}}</h1>
							<div class="book-inner" :style="{fontSize:fontSize+'px'}">{{bookContent.content}}</div>
						</div>
					</section>

				</div>
				<p class="article-page">{{currentPaging + '/' + resultPaging}}</p>
			</div>
		</div>
		<div class="page-read-option" :class="{'show-panel':option}" @click="setReadShow">
			<div class="top-controll-bar">
				<mt-header :title="book.title" class="book-header">
					<div @click="$router.back(-1)" slot="left">
						<mt-button icon="back">返回</mt-button>
					</div>
					<mt-button slot="right" @click="showSource" class="right">换源</mt-button>
				</mt-header>
			</div>
			<div class="addReader" @click="addBookSelf">
				<p>{{flag ? '撤出书架' : '加入书架'}}</p>
			</div>

			<div class="bottom-controll-bar">
				<div class="readSet">
          	<div class="readSet-item readbottom-color">
						<!-- <span v-for="(item,index) in pattern" :class="{active:readePattern===index}" @click.stop="setPattern(item,index)">{{item.item}}</span> -->
				 <ul class="readbottom-color">
        <li v-for="(item,index) in pattern" @click.stop="setPattern(item,index)" 
        :class="{'mui-icon mui-icon-checkmarkempty ':readePattern===index}" :style="{backgroundColor:item.background}"  :key="index"></li>
      </ul>
        	</div>
					<div class="readSet-item">
						<span @click.stop="fontSet('reduce',$event)">Aa-</span>
						<span @click.stop="fontSet('add',$event)">Aa+</span>

					</div>
				
					<div class="readSet-item">
						<span @click.stop="setPaging(0)" :class="{active:pagingPattern===0}">上下滑动</span>
						<span @click.stop="setPaging(1)" :class="{active:pagingPattern===1}">左右滑动</span>
					</div>
				</div>
				<mt-button type="default" @click="prevChapter" style="box-shadow:none">上一章</mt-button>
				<mt-button type="primary" @click.stop="setList" style="box-shadow:none">目录</mt-button>
				<mt-button type="default" @click="nextChapter" style="box-shadow:none">下一章</mt-button>
			</div>
		</div>
		<div class="chapter-list" v-show="listOption" @click.stop.pervent="setList">
			<div class="list-content">
				<div class="top-bar">
					<p>{{bookInfo.title}}</p>
				</div>
				<div class="chapter-con">
					<div ref="chapterList" class="chapterList">
						<div v-for="(list,index) in chapterList" @click="selectChapter(index)" :class="{'current':bookCurrentPage===index}">{{list}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="changeSource" v-show="changerSource" @click.stop="showSource">
			<div class="source-content">
				<ul>
					<li v-for="(item,index) in  SourceList" class="source-item" @click.stop="_changeSource(item,index)">
						<span class="item-left">{{item.name}}</span>
						<p class="center">最后更新：{{item.lastChapter}}</p>
						<div class="select" :class="{'active':_bookSource()===index}">已选择</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import {
		mapGetters
	} from 'vuex'
	import {
		Indicator,
		Toast
	} from 'mint-ui'
	// import Book from '../assets/js/bookSource'
	import {
		book,
		bookSources,
		BookChapters,
		chapterContent
	} from '../api/api'
	export default {
		data() {
			return {
				bookContent: {
					title: '',
					content: ''
				},
				nextContent: {
					title: '',
					content: ''
				},
				prevContent: {
					title: '',
					content: ''
				},
				bookCurrentPage: 0,
				bookSourceLinks: [],
				loading: false,
				option: false,
				chapterList: [],
				BookSourcesId: 0,
				listOption: false,
				moreLoading: false,
				changerSource: false,
				SourceList: [],
				sourceBtn: false,
				flag: false,
				bookInfo: {},
				pattern: [{
					item: '默认',
				
					background: '#eee6dd'
				}, {
					item: '夜间',
				
					background: '#000'
				}, {
					item: '护眼',
				
					background: '#c8e8c8'
        },
        {
					item: '浅粉',
				
					background: '#F8C9C9'
				}
        ],
				offsetX: 0,
				margin: 10,
				currentPaging: 1,
				resultPaging: 1,
				prevResultPaging: 1,
				styleObject: '',
				isClickPage: false,
				fontSize: 18,
				fontColor: '#5c5d58',
				background: '#eee6dd',
				readePattern: 0,
				pagingPattern: 0,
				bootPage: 0,
				clWidth: document.documentElement.clientWidth || document.body.clientWidth
			}
		},
		computed: {
			...mapGetters(['book'])
		},
		beforeCreate() {
			Indicator.open('加载中')

		},
		created() {
			this.getNewUser();
			this.BookSourcesId = this._bookSourceId()
		},
		beforeRouteEnter(to, from, next) {
			let localShelf = JSON.parse(window.localStorage.getItem('book')) ? JSON.parse(window.localStorage.getItem('book')) :
				{};
			next(vm => {
				if (!localShelf[vm.$route.params.id]) {
					vm.tryRead();
				}
				vm.getBookSources(vm.$route.params.id);
				vm.getBook(vm.$route.params.id);
			})

		},
		destroyed() {
			this.deleteTryRead()
		},
		mounted() {
			this.getUserLocalStorage();
			const that = this;
			window.onresize = () => {
				return (() => {
					that.clWidth = document.body.clientWidth;
					that.$router.go(0)
				})()
			};
		},
		methods: {
			//获取是否为新用户，新用户的则需要引导页
			getNewUser() {
				let localShelf = JSON.parse(window.localStorage.getItem('bootPage')) ? JSON.parse(window.localStorage.getItem(
					'bootPage')) : {};
				if (localShelf.bootPage) {
					this.bootPage = localShelf.bootPage
				} else {
					this.bootPage = 0;
				}
			},
			//引导页
			setBootPage() {
				let localShelf = JSON.parse(window.localStorage.getItem('bootPage')) ? JSON.parse(window.localStorage.getItem(
					'bootPage')) : {};
				localShelf = {
					bootPage: 1
				};
				this.bootPage = 1;
				window.localStorage.setItem('bootPage', JSON.stringify(localShelf));
			},
			//获取用户设置
			getUserLocalStorage() {
				let localShelf = JSON.parse(window.localStorage.getItem('userSet')) ? JSON.parse(window.localStorage.getItem(
					'userSet')) : {};
				this.fontSize = localShelf.fontSize;
				this.background = localShelf.background;
				this.fontColor = localShelf.color;
				this.readePattern = localShelf.readePattern;
				this.pagingPattern = localShelf.pagingPattern;
			},
			//将用户设置进行缓存
			setUserLocalStorage() {
				let localShelf = JSON.parse(window.localStorage.getItem('userSet')) ? JSON.parse(window.localStorage.getItem(
					'userSet')) : {};
				localShelf = {
					fontSize: this.fontSize,
					background: this.background,
					color: this.fontColor,
					readePattern: this.readePattern,
					pagingPattern: this.pagingPattern,
				};
				window.localStorage.setItem('userSet', JSON.stringify(localShelf));
			},
			//翻页模式设置
			setPaging(num) {
				this.option = !this.option;
				this.pagingPattern = num;
				this.setUserLocalStorage();
				if (num === 1) {
					this.$nextTick(function() {
						let scrollW = this.$refs.bookInner.scrollWidth;
						let clientW = this.$refs.bookInner.clientWidth;
						this.resultPaging = Math.floor(scrollW / clientW)
					})

				}
			},
			//阅读模式设置
			setPattern(item, index) {
				this.option = true;
				this.readePattern = index;
				this.fontColor = item.color;
				this.background = item.background;
				this.setUserLocalStorage()
			},
			//字体设置
			fontSet(str, ) {
  
        this.option = true;
        console.log(15156)
				if (str === 'reduce') {
           if(this.fontSize<=10){
         return
       }else{
         this.fontSize-=0.8
        	this.setUserLocalStorage()
       }
				
				}
				if (str === 'add') {
            if(this.fontSize>=26){
         return
       }else{
        this.fontSize+=0.8
         this.setUserLocalStorage()
       }
				
				}
			},
			//试阅读逻辑>进入阅读器>书源和id存入localStorage>当用户退出（不加入书架）立马删除localStorage
			//删除试阅读记录
			deleteTryRead() {
				let localShelf = JSON.parse(window.localStorage.getItem('tBook')) ? JSON.parse(window.localStorage.getItem('tBook')) :
					{};
				delete localShelf[this.$route.params.id];
				window.localStorage.setItem('tBook', JSON.stringify(localShelf))
			},
			//试阅读，由于尝试阅读也提供换源所以需要
			tryRead(index = 0) {
				let localShelf = JSON.parse(window.localStorage.getItem('tBook')) ? JSON.parse(window.localStorage.getItem('tBook')) :
					{};
				localShelf[this.$route.params.id] = {
					id: this.bookInfo._id,
					bookSource: index
				};
				window.localStorage.setItem('tBook', JSON.stringify(localShelf));

			},
			//加入书架
			addBookSelf() {
				let localShelf = JSON.parse(window.localStorage.getItem('book')) ? JSON.parse(window.localStorage.getItem('book')) :
					{};
				if (this.flag) {
					delete localShelf[this.$route.params.id];
					this.tryRead(this.BookSourcesId)
					window.localStorage.setItem('book', JSON.stringify(localShelf))
					this.flag = !this.flag;
					Toast({
						message: '操作成功',
						duration: 500
					});
				} else {
					this.deleteTryRead(); //用户在此页面加入书架，则为阅读模式，这时候删除试阅读模式的记录
					localShelf[this.$route.params.id] = {
						cover: this.bookInfo.cover,
						title: this.bookInfo.title,
						id: this.bookInfo._id,
						chapterIndexCache: this.bookCurrentPage,
						bookSource: this.BookSourcesId,
						pageIndexCache: this.currentPaging
					};
					window.localStorage.setItem('book', JSON.stringify(localShelf))
					this.flag = !this.flag;

					Toast({
						message: '操作成功',
						duration: 500
					});
				}

			},
			//换源列表显示
			showSource() {
				this.changerSource = !this.changerSource;
				this.sourceBtn = false;
			},
			//换源
			_changeSource(item, index) {
				this.isClickPage = false;
				this.changerSource = !this.changerSource;
				this.moreLoading = false;
				this.bookSource = [];
				Indicator.open('加载中');
				this.bookSourceLinks = [];
				this.BookSourcesId = index;
				this.currentPaging = 1;
				this.offsetX = 0;
				this.styleObject = {
					transform: 'translateX(' + this.offsetX + 'px' + ')',
					transitionDuration: '0s'
				};
				this.getBookChapters(item._id);
				if (this.getBookLocalStorage()[this.$route.params.id]) {
					this.setBookLocalStorage()
				} else {
					this.tryRead(index)
				}
			},
			//切换目录
			selectChapter(index) {
				this.isClickPage = false;
				this.moreLoading = false;
				this.loading = true;
				Indicator.open('加载中...');
				this.bookSource = [];
				this.bookCurrentPage = index;
				this.currentPaging = 1;
				this.offsetX = 0;
				this.styleObject = {
					transform: 'translateX(' + this.offsetX + 'px' + ')',
					transitionDuration: '0s'
				};
				this.getChapters(this.bookSourceLinks[index]);
				if (this.getBookLocalStorage()[this.$route.params.id]) {
					this.setBookLocalStorage()
				}

			},

			setList() {
				this.listOption = !this.listOption;
				if (!this.option) {
					return
				}
				this.option = !this.option;
			},

			setReadShow() {
				this.option = !this.option
			},
			//左右滑动
			setRead(e) {
				if (this.pagingPattern === 0) {
					this.option = !this.option
					return
				}
				let clWidth = document.documentElement.clientWidth || document.body.clientWidth;
				let currentX = e.pageX;
				let offsetX = clWidth / 3;

				if (currentX <= offsetX) { //用户点击左侧三分之一
					if (this.bookCurrentPage === 0 && this.currentPaging === 1) {
						Toast('已经是第一章了！');
						return
					}

					if (this.currentPaging === 1) { //当前页为第一页的时候

						Indicator.open('加载中...');
						this.isClickPage = true;
						this.getPrevChapter('click');

						this.bookCurrentPage--;
					} else { //当前页为其他页面的时候
						this.currentPaging--;
						this.offsetX += (clWidth - this.margin);
						this.styleObject = {
							transform: 'translateX(' + this.offsetX + 'px' + ')',
							transitionDuration: '0.5s'
						};
						if (this.getBookLocalStorage()[this.$route.params.id]) {
							this.setBookLocalStorage()
						}
					}

				} else if (offsetX <= currentX && currentX <= offsetX * 2) { //点击中间三分之一的时候
					this.option = !this.option
				} else if (currentX >= offsetX * 2 && currentX <= clWidth) { //用户点击右侧三分之一
					this.isClickPage = false;
					if (this.bookCurrentPage === this.bookSourceLinks.length) {
						Toast('已经是最后一章了！');
						return
					}
					//翻页
					this.currentPaging++;
					if ((this.resultPaging - this.currentPaging) === 2) { //当前页为总页数的倒数第二页的时候加载下一章
						this.getNextChapter()
					}
					if (this.currentPaging === this.resultPaging + 1) { //当前页等于总页数的时候
						Indicator.open('加载中...');
						this.styleObject = '';
						this.offsetX = 0;
						this.getNextChapter('click');
						this.bookCurrentPage++;
						this.currentPaging = 1;
						if (this.getBookLocalStorage()[this.$route.params.id]) {
							this.setBookLocalStorage()

						}

					} else { //当前页不等于总页数的时候
						this.offsetX -= (clWidth - this.margin);
						this.styleObject = {
							transform: 'translateX(' + this.offsetX + 'px' + ')',
							transitionDuration: '0.5s'
						};
						if (this.getBookLocalStorage()[this.$route.params.id]) {
							this.setBookLocalStorage()
						}
					}

				}
			},
			//字符串解析
			bookChaptersBody(books) {
				if (books) {
					let c = /[\u4E00-\u9FA5\uF900-\uFA2D]/g;
					let _book = JSON.stringify(books).replace(/^"|"$/g, '');
					this.loading = false;
					if (c.test(_book)) {
						_book = '<p>' + _book.replace(/\s*/g, '').replace(/\\n/g, '</p><p>') + '</p>';
						return _book
					} else {
						return 'vip章节，请购买或者换源阅读！' //换源功能已经实现
					}
				}


			},
			//获取和设置LocalStorage
			getBookLocalStorage() {
				let localShelf = JSON.parse(window.localStorage.getItem('book')) ? JSON.parse(window.localStorage.getItem('book')) :
					{};
				if (localShelf[this.$route.params.id]) {
					this.flag = true;
				}
				return localShelf
			},
			//将书源和章节及页面缓存到LocalStorage
			setBookLocalStorage() {
				let localShelf = JSON.parse(window.localStorage.getItem('book')) ? JSON.parse(window.localStorage.getItem('book')) :
					{};
				localShelf[this.$route.params.id].chapterIndexCache = this.bookCurrentPage;
				localShelf[this.$route.params.id].bookSource = this.BookSourcesId;
				localShelf[this.$route.params.id].pageIndexCache = this.currentPaging;
				window.localStorage.setItem('book', JSON.stringify(localShelf))
			},
			//获取阅读章节
			_chapterIndexCache() {
				return this.getBookLocalStorage()[this.$route.params.id] ? this.getBookLocalStorage()[this.$route.params.id].chapterIndexCache :
					0
			},
			//获取阅读章节页面
			_pageIndexCache() {
				return this.getBookLocalStorage()[this.$route.params.id] ? this.getBookLocalStorage()[this.$route.params.id].pageIndexCache :
					1
			},
			//书源index
			_bookSourceId() {
				return this.getBookLocalStorage()[this.$route.params.id] ? this.getBookLocalStorage()[this.$route.params.id].bookSource :
					0
			},
			//试阅读书源index
			_bookSource() {
				let tbook = JSON.parse(window.localStorage.getItem('tBook')) || {};
				return this.getBookLocalStorage()[this.$route.params.id] ? this.getBookLocalStorage()[this.$route.params.id].bookSource :
					tbook[this.$route.params.id].bookSource
			},
			//书籍信息
			getBook(id) {
				book(id).then((res) => {
					this.bookInfo = res.data;
				}, (error) => {
					Indicator.close();
					Indicator.open('网络错误');
					setTimeout(() => {
						Indicator.close();
					}, 1500)
				})
			},
			//获取书籍源
			getBookSources(id) {
				bookSources(id).then((res) => {
					console.log(res, 123)
					this.SourceList = res.data;
					//试阅读和加入书籍阅读
					if (this._bookSource()) {
						this.getBookChapters(this.SourceList[this._bookSource()]._id)
					} else {
						this.getBookChapters(this.SourceList[this._bookSourceId()]._id)
					}
				}, (error) => {
					Indicator.close();
					Indicator.open('网络错误');
					setTimeout(() => {
						Indicator.close();
					}, 1500)
				});
			},
			//根据书籍源获取章节
			getBookChapters(id) {
				let arr = [];
				BookChapters(id).then((res) => {
					var qqq = res.data.chapters
					console.log(res)
					for (let i = 0; i < qqq.length; i++) {
						arr.push(qqq[i].title);
						this.bookSourceLinks.push(encodeURIComponent(res.data.chapters[i].link))
					}
					this.chapterList = arr; //当书有番外篇的时候，追书神器api返回的内容是错乱的！
					this.getChapters(this.bookSourceLinks[this._chapterIndexCache()]);

				}, (error) => {
					Indicator.close();
					Indicator.open('网络错误');
					setTimeout(() => {
						Indicator.close();
					}, 1500)
				})
			},
			//根据章节link获取详细内容
			//根据章节link获取详细内容
			getChapters(link) {
				chapterContent(link).then((res) => {
					console.log(1231212, res.data.chapter)
					if (res.data.ok) {
						Indicator.close();
						if (res.data.chapter.cpContent) {
							// this.bookContent = this.GetBook_link(res.data.chapter.title, res.data.chapter.cpContent)
							this.bookContent.title = res.data.chapter.title;
							this.bookContent.content = res.data.chapter.cpContent;
							console.log(this.bookContent)
						} else {
							//  this.bookContent = this.GetBook_link(res.data.chapter.title, res.data.chapter.body)
							this.bookContent.title = res.data.chapter.title;
							this.bookContent.content = res.data.chapter.cpContent;
						}
						if (this.getBookLocalStorage()[this.$route.params.id]) {
							this.bookCurrentPage = this._chapterIndexCache();
							this.currentPaging = this._pageIndexCache();
							this.offsetX -= (this.currentPaging - 1) * (this.clWidth - this.margin);
							this.styleObject = {
								transform: 'translateX(' + this.offsetX + 'px' + ')',
								transitionDuration: '0s'
							};
						}
					} else if (res.data.code === -1) {
						Indicator.close();
						this.bookSource.push({
							title: '找不到资源',
							content: '请切换书源'
						});
						this.sourceBtn = true
					}
				});

			},
			//获取上一章
			getPrevChapter(click) {
				chapterContent(this.bookSourceLinks[this.bookCurrentPage - 1]).then((res) => {
					if (res.data.ok) {
						Indicator.close();
						if (res.data.chapter.cpContent) {
							// this.prevContent = this.GetBook_link(res.data.chapter.title, res.data.chapter.cpContent)
							this.prevContent.title = res.data.chapter.title;
							this.prevContent.content = res.data.chapter.cpContent;
							if (click) {
								this.bookContent = this.prevContent;
							}
						} else {

							// this.prevContent = this.GetBook_link(res.data.chapter.title, res.data.chapter.body)
							this.prevContent.title = res.data.chapter.title;
							this.prevContent.content = res.data.chapter.cpContent;
							if (click) {
								this.bookContent = this.prevContent
							}
						}
					}
				});
			},
			//获取下一章
			getNextChapter(click) {
				chapterContent(this.bookSourceLinks[this.bookCurrentPage + 1]).then((res) => {
					if (res.data.ok) {
						Indicator.close();
						if (res.data.chapter.cpContent) {
							// this.nextContent = this.GetBook_link(res.data.chapter.title, res.data.chapter.cpContent)
							this.nextContent.title = res.data.chapter.title;
							this.nextContent.content = res.data.chapter.cpContent;
							if (click) {
								this.bookContent = this.nextContent
							}
						} else {
							this.nextContent.title = res.data.chapter.title;
							this.nextContent.content = res.data.chapter.cpContent;
							// this.nextContent = this.GetBook_link(res.data.chapter.title, res.data.chapter.body)
							if (click) {
								this.bookContent = this.nextContent
							}
						}
					}
				});
			},
			//构建book类
			// GetBook_link(title, content){
			//   let book ={
			//     title: title,
			//     content: content
			//   };
			//   return book
			// },
			//无限加载
			loadMore() {
				this.loading = true;
				if (this.bookCurrentPage === this.bookSourceLinks.length) {
					return
				}
				this.moreLoading = true;
				this.bookCurrentPage++;
				setTimeout(() => {
					this.getChapters(this.bookSourceLinks[this.bookCurrentPage]);
					if (this.getBookLocalStorage()[this.$route.params.id]) {
						this.setBookLocalStorage();
					}
					this.loading = false;
					this.moreLoading = false;
				}, 2500);


			},
			//上下章节切换
			nextChapter() {
				if (this.bookCurrentPage === this.bookSourceLinks.length) {
					Toast('已经是最后一章了！');
					return
				}
				this.moreLoading = false;
				this.loading = true;
				Indicator.open('加载中...');
				this.bookSource = [];
				this.getNextChapter('click');
				this.currentPaging = 1;
				this.offsetX = 0
				this.styleObject = '';
        this.bookCurrentPage++;
        	this.$refs.wrapper.scrollTop = 0;
				if (this.getBookLocalStorage()[this.$route.params.id]) {
					this.setBookLocalStorage()
				}
			},
			prevChapter() {
				if (this.bookCurrentPage === 0) {
					Toast('已经是第一章了！');
					return
        }
        	this.$refs.wrapper.scrollTop = 0;
				this.moreLoading = false;
				this.loading = true;
				Indicator.open('加载中...');
				this.bookSource = [];
				this.getPrevChapter('click');
				this.currentPaging = 1;
				this.offsetX = 0;
				this.styleObject = '';
				this.bookCurrentPage--;
				if (this.getBookLocalStorage()[this.$route.params.id]) {
					this.setBookLocalStorage()
				}
			}
		},
		//watch: {
		// 	bookContent(newVal, oldVla) {
		// 		this.$refs.wrapper.scrollTop = 0;
		// 		if (this.pagingPattern === 1) {
		// 			this.$nextTick(function() {
		// 				let scrollW = this.$refs.bookInner.scrollWidth;
		// 				let clientW = this.$refs.bookInner.clientWidth;
		// 				this.resultPaging = Math.floor(scrollW / clientW);
		// 				if (this.isClickPage) {
		// 					this.currentPaging = this.resultPaging;
		// 					this.offsetX = -(this.currentPaging - 1) * (this.clWidth - this.margin);
		// 					this.styleObject = {
		// 						transform: 'translateX(' + this.offsetX + 'px' + ')',
		// 						transitionDuration: '0s'
		// 					};
		// 					if (this.getBookLocalStorage()[this.$route.params.id]) {
		// 						this.setBookLocalStorage()
		// 					}
		// 				}
		// 			});
		// 		}
		// 	}
		// }
	}
</script>
<style scoped lang="less">
	.book {
		background: #eee6dd;
		width: 100%;
		height: 100vh;
		overflow-y: scroll;
		margin-top: -1px;
		position: relative;

		.bootPage {
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			background: rgba(50, 51, 52, 0.9);
			z-index: 10000;
			display: flex;
			max-width: 750px;

			.b-item {
				width: 33.3333333%;

				.center {
					padding: 20px;
					line-height: 100vh;
					width: 100%;
					font-size: 15px;
					color: #d0d0d0;
					box-sizing: border-box;
				}
			}

			.bootPage-center {
				border-left: 1px solid #5c5c5c;
				border-right: 1px solid #5c5c5c;
			}
		}

		.books-con {
			width: 100%;

			.book-content {
				padding: 50px 10px 80px 10px;

				/*no*/
				.book-inner {
					text-align: justify;
					line-height: 60px;
					/*no*/
					text-indent: 2em;
				}

				.book-title {
					line-height: 50px;
					font-weight: 400;
					margin-bottom: 25px;
				}
			}
		}

		.loadMore {
			height: 80px;
			line-height: 80px;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}

		.read-content {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			.read-article {
				position: absolute;
				overflow: hidden;
				padding: 0 10px;
				/*no*/
				text-align: justify;
				bottom: 20px;
				/*no*/
				top: 50px;

				/*no*/
				.read-section {
					height: 100%;

					.read-section-inner {
						overflow: visible;
						height: 100%;

						.book-inner {
							line-height: 60px;
							/*no*/
							text-indent: 2em;
						}
					}

					.book-title {
						line-height: 50px;
						font-weight: 400;
						margin-bottom: 25px;
					}
				}
			}

			.article-page {
				color: #585858;
				font-size: 13px;
				position: absolute;
				left: 10px;
				bottom: 10px
			}
		}
	}

	.page-read-option {
		position: fixed;
		z-index: 888;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		visibility: hidden;

		.book-header {
			line-height: 40px;
			height: 40px;
			background-color: rgba(50, 51, 52, .9);
		}

		.bottom-controll-bar {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			text-align: center;
			font-size: 0;

			.mint-button {
				width: 33.33333%;
				line-height: 40px;
				height: 40px;
				color: #fff;
				background: rgba(50, 51, 52, 0.9);
				border-radius: 0;
				font-size: 15px;
			}

			.add_my {
				position: absolute;
				bottom: 200px;
				right: 0;
				width: 150px;
				height: 60px;
				line-height: 60px;
				border-radius: 50px 0 0 50px;
			}

			.readSet {
				width: 100%;
				color: #fff;
				font-size: 15px;
				background: rgba(50, 51, 52, 0.9);
				// padding: 20px;
				box-sizing: border-box;

				.readSet-item {
					height: 70px;
display: flex;
justify-content: space-around;
					span {
						text-align: center;
						// display: inline-block;
					line-height: 40px;
    height: 40px;
    width: 100px;
    border-radius: 25px;
						border: 1px solid #535353;

						&.active {
							border: 1px solid #409eff;
						}

						// .pattern {
						// 	span:nth-of-type(2) {
						// 		margin: 0 10px;
						// 	}
						// }
          }
          .mui-icon{
      display: flex;
      justify-content: center;
      align-items: center;
    }
          .readbottom-color{
  display: flex;
  justify-content: space-around;
  list-style: none;
   
  
  li{
    width: 30px;
    height: 30px;
    border-radius: 50%;
     margin: 5px 25px 5px 40px;
  }
}
				}
			}
		}

		.addReader {
			width: 17%;
			position: absolute;
			line-height: 30px;
			height: 30px;
			background: rgba(50, 51, 52, .9);
			color: #fff;
			text-align: center;
			border-radius: 10px;
			right: 0;
			top: 50px;

			p {
				font-size: 12px;
			}
		}
	}

	.show-panel {
		visibility: visible;
	}

	.chapter-list {
		position: fixed;
		z-index: 999;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: transparent;

		.list-content {
			width: 80%;
			height: 100%;
			background: #fff;
			position: absolute;

			.top-bar {
				position: absolute;
				width: 100%;
				height: 50px;
				line-height: 50px;
				font-size: 18px;
				font-weight: 600;
				padding-left: 20px;
				border-bottom: 1px solid #ebebeb;
				box-sizing: border-box;
				z-index: 100;
				background: #fff;
			}

			.chapter-con {
				position: absolute;
				top: 0;
				width: 100%;
				height: 100vh;
				margin-top: 40px;
				padding-left: 20px;
				box-sizing: border-box;
				overflow-y: scroll;

				.chapterList {
					width: 100%;

					div {
						line-height: 40px;
						height: 40px;
						font-size: 13px;
						margin-top: 5p;
						color: #999;
						border-bottom: 1px solid #ebebeb;

						&.current {
							color: #409EFF;
						}
					}
				}
			}
		}
	}

	.right {
		width: 100%;
		height: 80px;
		text-align: right;
	}

	.changeSource {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
		background-color: rgba(50, 51, 52, 0.8);

		.source-content {
			width: 300px;
			height: 400px;
			background: #fff;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 15px;
			padding: 20px;
			box-sizing: border-box;
			overflow-y: scroll;

			.source-item {
				line-height: 50px;
				font-size: 15px;
				position: relative;

				.center {
					width: 80%;
					font-size: 15px;
					color: #999;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.select {
					position: absolute;
					right: 0;
					top: 20px;
					background: #c9c9c9;
					// padding: 0 10px;
					border-radius: 15px;
					display: none;
					color: #fff;
					font-size: 12px;
					line-height: 15px;
					padding: 10px;
				}

				.active {
					display: block;
				}
			}
		}
	}

	.change_source_btn {
		width: 200px;
		height: 80px;
		text-align: center;
		line-height: 80px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -80px;
		margin-left: -100px;
		z-index: 1000;

		.source_btn {
			width: 100%;
			height: 100%;
			font-size: 25px;
		}
	}
</style>
