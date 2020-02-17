<template>
	<div >
		<mt-header :title="major" class="book-header">
		<div slot="left" @click="$router.back(-1)">
			<mt-button icon="back">返回</mt-button>
		</div>
		</mt-header>
  <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', index===largeTypeIndex ? 'mui-active' : '']"
		   v-for="(item,index) in SortType" 
            @click="setSortType(item.type,index)" :key="index">
            {{ item.name }}
          </a>
        </div>
      </div>

    </div>
 <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll" >
          <a :class="['mui-control-item', index===smallTypeIndex ? 'mui-active' : '']"
		   v-for="(minor,index) in mins" 
            @click="setSortTypeM(minor,index)" :key="index" style="padding :0 15px; ">
            {{ minor }}
          </a>
        </div>
      </div>

    </div>
  
		<div class="load-more" ref="load" :class="[mins.length>0?'padding-300':'padding-200']">
			<mt-loadmore class="loadmore" ref="loadmore" :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false"
			 :bottom-all-loaded="allLoaded">
				<div class="book-list">
					<h-blist class="book-s" :book="book" v-for="(book,index) in bookLists" :key="index" :sort="sort" :isLoadMore="isLoadMore"></h-blist>
					<div v-show="!bookLists.length" style="margin-top: 10px; text-align: center">暂无数据</div>
				</div>
			</mt-loadmore>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	// import Hblist from 'common/home-booklist'
	import mui from '../../lib/mui/js/mui.min.js';
	import {
		Indicator
	} from 'mint-ui'
	import {
		categoriesInfo,
		subCategories
	} from '@/components/api/api'
	export default {
		data() {
			return {
				largeTypeIndex: 0,
				smallTypeIndex: 0,
				type: 'hot',
				duration: 'last-seven-days',
				major: '',
				sort:true,
				minor: '',
				gender: '',
				start: 0,
				currentPage: 1,
				SortType: [{
						type: 'hot',
						name: '热门',
						
					},
					{
						type: 'new',
						name: '新书',
						duration: 'all',
						
					},
					{
						type: 'reputation',
						name: '好评',
						
					},
					{
						type: 'over',
						name: '完结',
						
					},
					{
						type: 'monthly',
						name: '包月',
					
					}
				],
				mins: [],
				bookLists: [],
				allLoaded: false,
				cate: true,
				isLoadMore: false
			}
		},
		 mounted() {
    // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
    // 2. 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
		methods: {
			setSortType(type, index) {
				this.largeTypeIndex = index;
				// console.log(this.largeTypeIndex==index)
				console.log(type)
				
				console.log(typeof(this.largeTypeIndex)===index)
				if (this.type === type) {
					return
				}
				this.type = type;
				console.log(this.type)
				this._getBookLists(this.gender, this.type, this.major, this.minor);
				//点击后重置滚动距离
				this.$refs.load.scrollTop = 0
			},
			setSortTypeM(minor, index) {
console.log(123)
				this.smallTypeIndex = index;
				if (this.minor === minor) {
					return
				}
				if (minor === '' || minor === '全部') {
					this.minor = ''
				} else {
					this.minor = minor;
				}
				this.currentPage = 1;

				this._getBookLists(this.gender, this.type, this.major, this.minor);
				//点击后重置滚动距离
				this.$refs.load.scrollTop = 0
			},
			_getBookLists(gender, type, major, minor = '', start = 0, limit = 20) {
				categoriesInfo(gender, type, major, minor, start, limit).then((res) => {
					if (res.data.ok) {
						this.bookLists = this.imgrequest(res.data.books)
					}
				}, (error) => {
					Indicator.close();
					Indicator.open('网络错误');
					setTimeout(() => {
						Indicator.close();
					}, 1500)
				})
			},
			imgrequest(arr) {
				for (let i = 0; i < arr.length; i++) {
					arr[i].cover = unescape(arr[i].cover);
					arr[i].cover = arr[i].cover.replace("/agent/", "")
				}
				return arr
			},
			loadBottom() {
				//加载更多
				this.isLoadMore = true;
				Indicator.open('加载中');
				categoriesInfo(this.gender, this.type, this.major, this.minor, this.currentPage * 20, 20).then((res) => {
					if (res.data.ok) {
						this.bookLists = this.bookLists.concat(this.imgrequest(res.data.books));
						setTimeout(() => {
							Indicator.close();
							this.isLoadMore = false;
						}, 350);
						this.currentPage++;
					}
				}, (error) => {
					Indicator.close();
					Indicator.open('网络错误');
					setTimeout(() => {
						Indicator.close();
					}, 1500)
				});
				this.$refs.loadmore.onBottomLoaded()
			},
			loadTop() {
				//下拉加载
				Indicator.open('加载中');
				categoriesInfo(this.gender, this.type, this.major, this.minor, 0, 20).then((res) => {
					if (res.data.ok) {
						this.bookLists = this.imgrequest(res.data.books)
						Indicator.close();
					}
				}, (error) => {
					Indicator.close();
					Indicator.open('网络错误');
					setTimeout(() => {
						Indicator.close();
					}, 1500)
				});
				this.$refs.loadmore.onTopLoaded()
			},
		},
	
		beforeRouteEnter(to, from, next) {
			/*获取大类中的小类*/
			next(vm => {
				vm.major = vm.$route.query.major;
				vm.gender = vm.$route.query.gender;
				subCategories().then((res) => {
					res.data[vm.$route.query.gender].forEach((type) => {
						if (type.major === vm.$route.query.major) {
							vm.mins = type.mins;
							if (type.mins.length > 0) {
								vm.mins.unshift('全部')
							}
						}
					});
				}, (error) => {
					Indicator.close();
					Indicator.open('网络错误');
					setTimeout(() => {
						Indicator.close();
					}, 1500)
				});
				vm._getBookLists(vm.$route.query.gender, vm.type, vm.$route.query.major)
			})
		}

	}
</script>

<style scoped lang="less">
	
	.book-header {
			height: 50px;
			line-height: 50px;
			font-size: 15px;
			background: #409eff;
		
			width: 100%;
			z-index: 10;


			.book-list {
				width: 100%;
				background: #fff;
				
			}
		
		.book-s:last-child{
			margin-bottom: 6vh;
		}
			.load-more {
				overflow-y: scroll;
				height: 100vh;
				box-sizing: border-box;
			}
			.padding-300 {
				padding-top: 300px;
			}
		.padding-200 {
				padding-top: 200px;
			}
			// .active {
			// 		color: #409eff;
			// 	}

		}
</style>
