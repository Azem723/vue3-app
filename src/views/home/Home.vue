<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker />
</template>

<script>
import StaticPart from './StaticPart';
import Nearby from './Nearby';
import Docker from '../../components/Docker';

export default {
  name: '--Home--', //  会在Vue DevTools里显示，如果不写就显示文件名
  components: {
    StaticPart,
    Nearby,
    Docker
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem 0.2rem 0.18rem;
}

/* .docker__item {
      flex: 1;
      text-align: center;
      .iconfont {
        margin: 0.07rem 0 0.02rem 0;
        font-size: .18rem;
      }
  }

  .docker__item--active {
    color: #1FA4FC;
  } */
/* 浏览器默认显示最小字体12px，如果需要更小需要进行缩放 */
/* .docker__title {
    font-size: 20px;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  } */
</style>
