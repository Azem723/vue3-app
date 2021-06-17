<template>
  <div class="header">我的全部购物车 ({{ shopNum }})</div>
  <div class="wapper">
    <div class="wapper__content" v-for="item in cartList" :key="item">
      <ShopCartInfo :item="item" v-if="Object.keys(item.productList).length" />
    </div>
  </div>
  <Docker />
</template>

<script>
import Docker from '../../components/Docker';
import ShopCartInfo from './ShopCartInfo';
import { getCartListEffect } from './getCartList';

const useGetCartListEffect = () => {
  const { cartList } = getCartListEffect();
  const cartArr = Object.values(cartList);
  let shopNum = 0
  cartArr.map((item) => {
    if (Object.keys(item.productList).length !== 0) {
      shopNum += 1;
    }
  });
  return { cartList, shopNum };
};

export default {
  name: 'CartList',
  components: {
    Docker,
    ShopCartInfo
  },
  setup() {
    const { cartList, shopNum } = useGetCartListEffect();
    return { cartList, shopNum };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.header {
  position: absolute;
  width: 100%;
  top: 0;
  font-size: 0.16rem;
  line-height: 0.44rem;
  color: $content-fontcolor;
  text-align: center;
  background: $bgColor;
}
.wapper {
  position: absolute;
  overflow-y: scroll;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0.49rem;
  width: 100%;
  padding-top: 0.08rem;
  background: $content-bgColor;

  &__content {
    top: 0;
    padding: 0.08rem 0.18rem;
    overflow-y: auto;
  }
}
</style>
