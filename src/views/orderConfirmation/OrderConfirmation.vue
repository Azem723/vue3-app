<template>
  <div class="wrapper">
    <div class="bgcor"></div>
    <TopArea />
    <ProductList />
  </div>
  <Order />
</template>

<script>
import TopArea from './TopArea';
import ProductList from './ProductList';
import Order from './Order';

export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProductList, Order }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0.49rem;
  background-color: #eee;
}
.bgcor {
  position: absolute;
  top: 0;
  height: 1.405rem;
  width: 100%;
  background-size: 100% 1.59rem;
  background: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, $btn-bgColor 50%);
  background-repeat: no-repeat;
}
</style>
