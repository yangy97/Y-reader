# y-reader

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
## 实现功能

 小说书架

 分类查询

 书单查询

排行榜

搜索

小说详情

小说换源

 阅读历史记录

### 我在2019年初学vue2.0本来初学做好了一版小说阅读，但是感觉不好看，所以重新写了一个，利用vue4.0搭的框架,作为实习还行
### 技术栈
```
vue vue-cli3 vue-router vuex es6 webpack axios less mint-ui   mui javaScript
```
```
mui 写的底部导航条和书架界面
mint完成了大多数比如轮播，list等都是mint
在使用mui和mint的时候会遇到样式冲突，我的解决办法是引入一个css重置样式，引入到需要的单页面中，基本都能成功
```
### 我借用了大佬封装好的api
```
直接调用的他的api，基本都是利用的追书神器的api
```
### 跨域问题
```
追书神器没用设置导致会在本地形成跨域问题，解决办法是在本地新建立一个vue.config.js 文件，重写api
 proxy: {
	    '/api': {
	      target: 'http://api.zhuishushenqi.com',
	      ws: true,
	      changeOrigin: true,
	      pathRewrite: {
	        '^/api': ''
	      }
	    },
	    '/content': {
	      target: 'http://chapter2.zhuishushenqi.com',
	      changeOrigin: true,
	      ws: true,
	      pathRewrite: {
	        '^/content': ''
	      }
	    }
	  }
	}
```
### 本地谷歌浏览器
```
在使用mui的时候，我用到了滑动导航条，但是在谷歌会默认阻止，你可以加入 *{ touch-action: pan-y; } 就可以解决
```
### 服务器配置
```
我配置了Nginx，网上有教程，很简单
```

### 截图
![](https://github.com/yangy97/Y-reader/blob/master/screenshot/shouye.png)![](https://github.com/yangy97/Y-reader/blob/master/screenshot/shujia.png)

![](https://github.com/yangy97/Y-reader/blob/master/screenshot/yuedu.png)![](https://github.com/yangy97/Y-reader/blob/master/screenshot/author.png)

![](https://github.com/yangy97/Y-reader/blob/master/screenshot/detail.png)![](https://github.com/yangy97/Y-reader/blob/master/screenshot/feilei.png)

![](https://github.com/yangy97/Y-reader/blob/master/screenshot/jingxuan.png)![](https://github.com/yangy97/Y-reader/blob/master/screenshot/paihang.png)

![](https://github.com/yangy97/Y-reader/blob/master/screenshot/search.png)

### 心得
```
做第二版的初衷是，我刚好实习了几个月在公司利用vue开发了一些项目，所以打算重新写这个小说，让自己得到锻炼，在以后面试也能多一个项目经验，虽然是纯粹的前端，但还是学到了不少，利用flex布局，刚好趁着疫情就在家瞎鼓捣，大概写了一周吧，主要花在了分类详情页面，上面的滑动导航利用的是mui，但是跟mint的css样式有所冲突，这个花了很长的时间，再然后就是阅读界面，要写设置，要写目录，要写缓存（本地缓存），花费了很长的时间，其他页面不难，总体来说不是很难，我也写不出什么心得了，哈哈哈
```