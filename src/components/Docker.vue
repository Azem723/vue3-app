<template>
  <div class="docker">
    <!-- BEM block__element--Modifire -->
    <div
      v-for="item in dockerList"
      :class="{
        docker__item: true,
        'docker__item--active': item.to.name === currentRoute
      }"
      class="docker__item"
      :key="item.icon"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

const getcurrentRouteEffect = () => {
  const router = useRouter();
  const currentRoute = router.currentRoute.value.name;
  return currentRoute;
};

export default {
  name: 'Docker',
  setup() {
    const dockerList = [
      { icon: '&#xe6f3;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe60a;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe671;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe609;', text: '我的', to: { name: 'Person' } }
    ];
    const currentRoute = getcurrentRouteEffect();

    return {
      dockerList,
      currentRoute
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.docker {
  display: flex;
  box-sizing: border-box;
  /* 以border作为区块最外层 */
  position: absolute;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;

  &__item {
    // BEM命名规则
    flex: 1;
    text-align: center;
    a {
      color: $content-fontcolor;
      text-decoration: none;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }

    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }

  &__title {
    height: 0.14rem; // 需要给一个height防止块大小变形
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
