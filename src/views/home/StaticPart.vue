<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe67b;</span>
    北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe613;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe600;</span>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
    />
  </div>
  <div class="icons">
    <div class="icons__item" v-for="item in iconsList" :key="item.desc">
      <img
        class="icons__item__img"
        :src='`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`'
      />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup() {
    const iconsList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '烘培蛋糕' },
      { imgName: '红包', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return {
      iconsList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  color: $content-fontcolor;
  @include ellipsis;

  /* 高优先级写法 */
  .position__icon {
    position: relative;
    top: 0.01rem;
    margin-right: 0.08rem;
    font-size: 0.2rem;
  }

  .position__notice {
    position: absolute;
    right: 0;
    top: 0.17rem;
    font-size: 0.2rem;
  }
}
.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background: $search-bgColor;
  color: $search-fontColor;
  border-radius: 0.16rem;
  .iconfont {
    display: inline-block;
    padding: 0 0.12rem 0 0.16rem;
    font-size: 0.16rem;
  }
  &__text {
    display: inline-block;
    font-size: 0.14rem;
  }
}

.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%; //加载前提前占位，配合height:0，overflow: hidden
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.gap {
  height: 0.1rem;
  background: $content-bgColor;
  margin: 0 -0.18rem 0 -0.18rem;
}
</style>
