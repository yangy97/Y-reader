
<template>
 	<div >
		<!-- <mt-header :title="major" class="book-header">
		<div slot="left" @click="$router.back(-1)">
			<mt-button icon="back">返回</mt-button>
		</div>
		</mt-header> -->
        <mt-header title="精选书籍" class="book-header">
     <div slot="left" @click="$router.back(-1)">
			<mt-button icon="back">返回</mt-button>
		</div>
    </mt-header>
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll" >
          <a :class="['mui-control-item', index===smallTypeIndex ? 'mui-active' : '']"
		   v-for="(item,index) in Other" 
            @click="setFeaturedM(item.minor,index)" :key="index" style="padding :0 15px; ">
            {{ item.name }}
          </a>
        </div>
      </div>

    </div>
  <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', index===largeTypeIndex ? 'mui-active' : '']"
		   v-for="(item,index) in Hot" 
            @click="setFeatured(item.type,index,item.duration)" :key="index">
            {{ item.name }}
          </a>
        </div>
      </div>

    </div>
 
  
	 <div class="load-more">
      <mt-loadmore class="loadmore" :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore" :auto-fill="false"
                   :bottom-all-loaded="allLoaded">
        <div class="book-list">
          <b-list :book="book" v-for="book in bookLists" :key="book._id" :isBookList="isBookList"
                     :isLoadMore="isLoadMore"></b-list>
        </div>
      </mt-loadmore>
    </div>
    <router-view></router-view>
	</div>
</template>
<script type="text/ecmascript-6">
//  import BookList from '@/comm/book-list'
  import {Indicator} from 'mint-ui'
  import {bookLists} from  '@/components/api/api'

  export default{
    data(){
      return {
        largeTypeIndex: 0,
        smallTypeIndex: 0,
        type: 'collectorCount',
        duration: 'last-seven-days',
        minor: '',
        gender: '',
        start: 0,
        currentPage: 1,
        Hot: [
          {
            type: 'collectorCount',
            name: '本周最热',
            duration: 'last-seven-days'
          },
          {
            type: 'created',
            name: '最新发布',
            duration: 'all'
          },
          {
            type: 'collectorCount',
            name: '最多收藏',
            duration: 'all'
          }
        ],
        Other: [
          {
            minor: '',
            name: '全部'
          },
          {
            minor: 'male',
            name: '男生',
          },
          {
            minor: 'female',
            name: '女生'
          }
        ],
        bookLists: [],
        allLoaded: false,
        isBookList: true,
        isLoadMore: false
      }
    },
    created(){
      this._getBookLists(this.type, this.duration, this.start, this.gender)
    },
    methods: {
      setFeatured(type, index, duration){
        this.largeTypeIndex = index;
        this.type = type;
        this.duration = duration;
        this._getBookLists(this.type, this.duration, this.start, this.gender)
      },
      setFeaturedM(minor, index){
        this.smallTypeIndex = index;
        this.minor = minor;
        this.gender = '&gender=' + minor;
        this.currentPage = 1;
        this._getBookLists(this.type, this.duration, this.start, this.gender)
      },
      _getBookLists(type, dur, start, gender){
        Indicator.open('加载中');
        bookLists(type, dur, start, gender).then((res)=>{
            if(res.data.ok){
              this.bookLists = this.imgrequest(res.data.bookLists)
              Indicator.close();
            }
        },(error)=>{
          Indicator.close();
          Indicator.open('网络错误');
           setTimeout(()=>{
             Indicator.close();
           },1500)
        })
//        api.get(`/booklists?sort=${type}&duration=${dur}&start=${start}${gender}`, {}, (res) => {
//          this.bookLists = this.imgrequest(this.normalizeBooks(res.bookLists))
//          Indicator.close();
//        })


      },
      imgrequest(arr){
        for (let i = 0; i < arr.length; i++) {
          arr[i].cover = unescape(arr[i].cover);
          arr[i].cover = arr[i].cover.replace("/agent/", "")
        }
        return arr
      },
      loadBottom(){
        //加载更多
        this.isLoadMore = true;
        Indicator.open('加载中');
        api.get(`/booklists?sort=${this.type}&duration=${this.duration}&start=${this.currentPage * 20}${this.gender}`, {}, (res) => {
          res.bookLists.cover = this.imgrequest(res.bookLists);
          this.bookLists = [...this.bookLists, ...res.bookLists];
          this.currentPage++;
          setTimeout(() => {
            this.isLoadMore = false
            Indicator.close();
          }, 350)
        });
        this.$refs.loadmore.onBottomLoaded()
      },
      loadTop(){
        //下拉加载
        this._getBookLists(this.type, this.duration, this.start, this.gender);
        this.$refs.loadmore.onTopLoaded()
      }
    },
  
  }
</script>
<style scoped lang="less" >
  .bookLists
   { .book-header
    { height: 37px;
    line-height: 36px;
    font-size: 12px;
      background :#409eff;
      position: absolute;
      width: 100%;
      z-index :10;}
    .select {
      position: absolute;
      top: 35px;
      left: 0;
      background :#fff;
      z-index: 10;
      width: 100%;
    }
    .select-bar {
      display :flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: nowrap;
      height: 38px;
      width: 100%;
      overflow-x: auto;
      overflow-y :hidden;
      border-bottom: 1px solid #f2f2f2;
    }
    .select-bar li {
      text-align :center;
      flex :1;
      line-height :35px;
      padding: 0 10px;
      font-size :12px;
    }
    .book-list {
      width: 100%;
      background :#fff;
    }
    .load-more
      {padding-top: 10vh;
      overflow-y: scroll;
      height :100vh;
      box-sizing :border-box;}
    .active 
    {  color: #409eff;
      border-bottom :1px solid #409eff; }
    }
</style>
