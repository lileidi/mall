<!-- 商品评论信息展示 -->
<template>
    <div class='detailcommentinfo' v-if="Object.keys(commentInfo).length !== 0">
        <div class="info-header ">
            <div class="header-title">用户评价</div>
            <div class="header-more">
                更多
                <i class="arrow-rigth"></i>
            </div>
        </div>
        <div class="info-user">
            <img :src="commentInfo.user.avatar" alt="">
            <span>{{commentInfo.user.uname}}</span>
        </div>
        <div class="info-detail">
            <p>{{commentInfo.content}}</p>
            <div class="info-other">
                <span class="date">{{commentInfo.created | showDate}}</span>
                <span class="style">{{commentInfo.style}}</span>
            </div>
            <div class="info-imgs">
                <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import {formatDate} from 'common/utils.js'
export default {
    name: 'DetailCommentInfo',
    data() {
        return {

        }
    },
    props:{
        commentInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    filters: {
		showDate: function (value) {
        let date = new Date(value*1000);
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
}
</script>
<style scoped>
    .detailcommentinfo{
        padding: 5px 12px;
        border-bottom: 5px solid #f2f5f8;
        color: #333;
    }
    .info-header{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid rgba(0,0,0,.1);
    }
    .header-title{
        float: left;
        font-size: 15px;
    }
    .header-more{
        float:right;
        margin-right: 10px;
        font-size: 13px;
    }
    .info-user{
        padding:10px 0 5px;
    }
    .info-user img{
        width: 42px;
        height: 42px;
        margin-right: 10px;
        border-radius: 50%;
    }
    .info-user span{
        position: relative;
        top: -15px;
        font-size: 15px;
    }
     .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>