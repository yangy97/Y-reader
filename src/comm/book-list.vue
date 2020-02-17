<template>
  <div class="book-item" @click="goBooks(book._id)">
    <div class="cover">
      <img :src="book.cover"
           alt="">
    </div>
    <div class="item-txt">
      <h4 class="name">{{book.title}}</h4>
      <p class="author" style="font-size:9px;margin:0px">{{book.author}}</p>
      <p class="desc" style="font-size:9px;margin:0px">{{book.shortIntro}}</p>
      <p sstyle="font-size:9px;margin:0px" class="desc" v-show="isBookList">{{book.desc}}</p>
      <p style="font-size:9px;margin:0px" class="cat" v-if="home">
        {{book.cate}}
        <span  class="split">|</span>
        <span class="read-people"> {{latelyFollower}}</span>
        万人气
      </p>
      <p  style="font-size:9px;margin:0px" class="cat" v-if="cate||ranks|| isSearch">
        <span class="read-people"> {{latelyFollower}}</span>万人气
        <span class="split">|</span>
        <span class="read-people">  {{book.retentionRatio}}%</span>读者留存
      </p>
      <p style="font-size:12px;margin:0px" class="cat" v-if="isBookList">
     共  <span class="read-people"> {{book.bookCount}}</span>本书
        <span class="split">|</span>
        <span > {{collectorCount}}</span>
      </p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    props: {
      book: {
        type: Object,
        default: null
      },
      home: {
        type: Boolean,
        default: false
      },
      cate: {
        type: Boolean,
        default: false
      },
      ranks: {
        type: Boolean,
        default: false
      },
      isSearch: {
        type: Boolean,
        default: false
      },
      isBookList: {
        type: Boolean,
        default: false
      },
      isLoadMore: {
        type: Boolean,
        default: false
      }

    },
    computed: {
      latelyFollower () {
        return (this.book.latelyFollower / 10000).toFixed(1)
      },
      collectorCount () {
          if(this.book.collectorCount){
            if (this.book.collectorCount > 10000) {
              return (this.book.collectorCount / 10000).toFixed(1) + '万人收藏'
            } else {
              return this.book.collectorCount + '人收藏'
            }
          }else {
            return 0+ '人收藏'
          }
      }

    },
    created(){
    },
    methods: {
      goBooks(id){
        if (this.isLoadMore) {
          return
        }
        if (this.isBookList) {
          this.$router.push({
            path: `/booklist-deatil/${id}`
          });
        } else {
          this.$router.push({
            path: `/book/${id}`
          });
        }
      },
    }
  }
</script>
<style scoped lang="less" >
  .book-item
   { 
	   display: flex;
    padding: 18px;
    height: 20%;
    border-bottom :1px solid #f5f5f5; /* no*/
    &:last-child
	 { border-bottom :none;
	 
	 margin-bottom: 7.5vh;}
    .cover
    { 
      //  flex :0 0 20%;
      height: 15vh;
      margin-right: 10px;
    //   overflow: hidden;
      background :url('../assets/default.jpg') no-repeat;
      background-position: 50%;
      background-size: 100%;
      img
	   { max-width :100%;
	   height: inherit;}}
    .item-txt
     { flex :1;
      width :100%;
	  overflow: hidden;
	  height: inherit;
      .name
       { font-weight: 400;
        font-size: 12px; /* no*/
        line-height :16px;
        white-space :nowrap;
        text-overflow: ellipsis;
        overflow: hidden;}
      p
       { line-height: 16px;
        white-space :nowrap;
        text-overflow: ellipsis;
		// overflow :hidden;
		}
      .desc, .author
      {  color: #999;}
      .cat
       { color :#666;}
      .read-people
       { color: red;}
}}
</style>
