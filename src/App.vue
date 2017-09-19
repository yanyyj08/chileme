<template>
  <div class="app" id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {urlParam} from 'common/js/util';
  import header from 'components/header/header';

  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller: {
          id: (function() {
            let queryParam = urlParam();
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = Object.assign(response.data, this.seller);
        }
      }, response => {
        console.log('error');
      });
    },
    components: {
      vHeader: header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/index.styl'
  
  .app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, .1))
      .tab-item
        flex: 1
        text-align: center
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
        
</style>
