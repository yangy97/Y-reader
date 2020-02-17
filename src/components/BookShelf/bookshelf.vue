<template>
  
      <div class="content-shelf">
            <mt-header title="我的收藏" class="book-header" >
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
     
    </mt-header>
  
    
   <div class="add" v-show="books.length<3"  @click="goAdd()">
 
 <div class="img-add"><img src="../../assets/add.png" alt=""></div>
  <div class="wenzi">快去添加你喜欢的小说吧</div>
   </div>
    <div class="bookshelf">
    <ul
      v-for="(item,i) in books"
      :key="item.id"
      class="mui-table-view mui-table-view-striped mui-table-view-condensed"
    >  <span @click="getspan(item.id,i)" class="mui-icon mui-icon-trash spans"></span>
      <router-link :to="{name:'read',params:{id:item.id}}" class="mui-table-view-cell" tag="li">
        <div class="mui-table">
          <div class="mui-table-cell mui-col-xs-10">
            <img class="mui-media-object mui-pull-left" :src="item.cover" alt>
            <h4 class="mui-ellipsis">
              <span>{{item.title}}</span>
            </h4>
            <div class="cunliu">
              <h5>作者：{{item.author}}</h5>
            </div>
            <p>连载至：{{item.lastChapter}}</p>
          </div>
        </div>
      </router-link>
    </ul>
    <m-bottom></m-bottom>
  </div>
    </div>
</template>
<script>
// import { book, bookmulu,bookrecommend } from "../api/api.js";
import { mapState, mapMutations } from "vuex";
import { MessageBox,PaletteButton  } from 'mint-ui';
export default {
  data() {
    return {
      books: [],
      getBook:{},
      bookstit:{}
    };
  },
  computed: {
    ...mapState(["calbook"])
  },
  created() {
    this.getbook();
  },
  methods: {
    ...mapMutations([
      'SET_BOOK'
		]),
    getbook() {
      // let bookidArray=[]
      var bookshelf = JSON.parse(window.localStorage.getItem("book") || "{}");
      for (let i in bookshelf) {
          bookshelf[i].cover = this.imgrequest(bookshelf[i].cover)
          this.books.push(bookshelf[i])
         
         
        }
         console.log(this.books)
    },
    imgrequest(arr) {
				arr = unescape(arr).replace("/agent/", "")
        return arr
			},
    getspan(item,i) {
      var del = JSON.parse(window.localStorage.getItem("book") || "{}");
       MessageBox.confirm('确定要从书架中删除').then(action => {
      delete del[item]
      delete this.books[i]
  localStorage.setItem('book', JSON.stringify(del))
          window.location.reload() 
})
   },
   goAdd(){
        this.$router.push({
          path: '/sort'
        })
   }
  }
}
</script>
<style lang="less" scoped>
// div{
//   text-align: center;
// }
	.content-shelf{
        background-color: #fff;
       .add
      {
          position: absolute;
  
    left: 50%;
    top: 50%;
     transform: translate(-50%,-50%);
    z-index: 200;
    background: #409eff;
    /* margin-left: 50%; */
    /* margin-top: 40%; */
    font-size: 25px;
    border-radius: 15px;
    background-color: #fff;
        // height: 80vh;
      //   display: flex;
      //  z-index: 999;
      //   flex-direction: column;
      //   justify-content: center;
      //   align-items: center;
      img{
        width: 50px;
        height: 50px;
        text-align: center;
       margin-left: 33%;
      }
      .wenzi{
        color: #999;
        font-size: 15px;
        text-align: center;
      }
//     a {
//     margin: 3px;
//     width: 50px;
//     height: 50px;
//     display: inline-block;
//     text-align: center;
//     background-color: #fff;
//     border: 1px solid #ddd;
//     border-radius: 25px;
//     background-clip: padding-box;
// }
     
    }
.bookshelf {
 &:last-of-type{
   margin-bottom: 7.5vh;
 }
  .spans{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }
  .cunliu {
    display: flex;
    justify-content: space-between;
    :nth-child(1) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    :nth-child(2) {
      font-size: 20px;
    }
  }
  .mui-ellipsis {
    display: flex;
    justify-content: space-between;
    .wordCount {
      font-size: 12px;
      color: #00c98c;
      padding-right: 5px;
    }
  }

  p {
    font-size: 13px;
    color: #333;
  }
  img {
    max-width: 66px;
    height: 70px;
    
			 	background:url('../../assets/default.jpg') no-repeat;
  }
  .mss {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .p1 {
    font-size: 12px;
    color: #333;
    border-left: 2px solid #00c98c;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .grid-content {
    margin: 0px 10px;
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .pl2 {
      color: #999;
    }
  }
  .mui-table {
    h4 {
      color: #333;
      font-size: 14px;
    }
    p {
      font-size: 10px;
    }
  }
}}
</style>
