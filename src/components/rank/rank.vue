<template>
  <div>
    <mt-header title="小说排行榜"></mt-header>
    <div class="Rank">
      <div class="rank-section" v-show="maleRank.length">
        <h4>男生</h4>
        <div class="rank-item" v-for="item in maleRank" @click="goRankDetail(item)">
          <img :src="url+item.cover" alt="">
          <span>{{item.title}}</span>
        </div>

      </div>
      <div class="rank-section" v-show="femaleRank.length">
        <h4>女生</h4>
        <div class="rank-item" v-for="item in femaleRank" @click="goRankDetail(item)">
          <img :src="url+item.cover" alt="">
          <span>{{item.title}}</span>
        </div>
      </div>
	  <div class="rank-section" v-show="pictureRank.length">
	    <h4>动漫</h4>
	    <div class="rank-item" v-for="item in pictureRank" @click="goRankDetail(item)">
	      <img :src="url+item.cover" alt="">
	      <span>{{item.title}}</span>
	    </div>
	  </div>
	  <div class="rank-section" v-show="epubRank.length">
	    <h4>出版</h4>
	    <div class="rank-item" v-for="item in epubRank" @click="goRankDetail(item)">
	      <img :src="url+item.cover" alt="">
	      <span>{{item.title}}</span>
	    </div>
	  </div>
    </div>
     <m-bottom></m-bottom>

  </div>
</template>
<script >
  import {mapMutations} from 'vuex'
  import {rankCategory} from '@/components/api/api'
  import {Indicator} from 'mint-ui'
  export default{
    data(){
      return {
        url: 'http://statics.zhuishushenqi.com/',
        femaleRank: [],
        maleRank: [],
		pictureRank:[],
		epubRank:[]
      }
    },
    created(){
      this.getRank()
    },
    methods: {
      getRank(){
        Indicator.open('加载中...');
        rankCategory().then((res) => {
          if (res.data.ok) {
            this.femaleRank = res.data.female.slice(0, 6);
            this.maleRank = res.data.male.slice(0, 6);
			this.pictureRank=res.data.picture.slice(0, 6);
			this.epubRank=res.data.epub.slice(0, 6);
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
      goRankDetail(item){
        this.$router.push({
          path: `/rank/${item._id}`,
          query: {title: item.title}
        });
        // this.setRank(item)
      },
      // ...mapMutations({
      //   setRank: 'SET_RANK'
      // }),
    }

  }
</script>
<style scoped lang="less" >
	
  .Rank{
    .rank-section{
      h4{
        line-height: 15px;
        padding:  0 10px;
        color:  #666;
        font-weight:  normal;
		
		font-size: 12px;}
      .rank-item{
        display:  flex;
        height :60px;
        align-items:  center;
        padding-left:  20px;
		// font-size: 12px;
        img{
          width:  40px;
          height:  30px;
		  padding-right: 12px;
}
        span{
          flex:  1;
          // margin-left:  15px;
          line-height:  15px;
          font-size : 12px;
          border-bottom:  1px solid #f5f5f5;
          // padding:  20px 0;
          box-sizing : content-box;}}
          }}
</style>
