<template>
	<div>
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-yyy" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-yyy" to="/featured">
			<span class="mui-icon mui-icon-extra mui-icon-extra-gift"></span>
				<span class="mui-tab-label">精选</span>
			</router-link>
			
			<router-link class="mui-tab-item-yyy" to="/sort">
				<span class="mui-icon mui-icon-extra mui-icon-extra-class">
					
				</span>
				<span class="mui-tab-label">分类</span>
			</router-link>
			
			<router-link class="mui-tab-item-yyy" to="/rank">
				<span class="mui-icon mui-icon-extra mui-icon-extra-rank"></span>
				<span class="mui-tab-label">排行</span>
			</router-link>
			
			<router-link class="mui-tab-item-yyy" to="/bookshelf">
				<span class="mui-icon mui-icon-extra mui-icon-extra-xiaoshuo"></span>
				<span class="mui-tab-label">书架</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
</script>

<style  lang="less">
// 动画
.v-enter{
opacity: 0;
transform: translateX(100%);
}
.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
position: absolute;
}
.v-enter-active,.v-leave-active{
transition: all .3s ease;
}
.mui-bar-tab .mui-tab-item-yyy.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-yyy {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-yyy .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-yyy .mui-icon~.mui-tab-label {
    font-size: 9px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
