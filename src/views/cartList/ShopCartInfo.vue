<template>
  <div class="shopCartInfo">
    <span class="shopName">{{ item?.shopName }}</span>
    <div class="product">
      <template v-for="(product, index) in localProductList" :key="index">
        <div class="product__item" v-if="product.count > 0">
          <img class="product__item__img" :src="product?.imgUrl" />
          <div class="product__item__info">
            <span class="product__item__info__name">{{ product?.name }}</span>
            <span class="product__item__info__price">
              <p class="product__item__info__priceCount">
                <span class="yen">&yen;</span
                ><span>{{ product?.price }} x {{ product?.count }}</span>
              </p>
              <p class="product__item__info__priceTotal">
                <span class="yen">&yen;</span
                ><span>{{ product.calculatedPrice }}</span>
              </p>
            </span>
          </div>
        </div>
      </template>
    </div>
    <!-- <div
      class="showProduct"
      @click="switchShow"
      v-show="Object.keys(item?.productList).length > 2"
    >
      共计{{ Object.keys(item?.productList).length }}件 <span class="arrow" />
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ShopCartInfo',
  props: ['item'],
  computed: {
    //  computed属性的使用方法：
    localProductList: {
      get() {
        // 获取父组件传递的props： this.item并将其转化为数组
        const listFromParent = Object.values(
          this.item.productList
          // toRaw(this.item.productList)
        );
        // 利用数组方法，获取proxy对象中的值，执行计算单个商品总价的方法，并添加到processedList中
        const processedList = listFromParent.map((item) => ({
          ...item,
          calculatedPrice: (item.count * item.price).toFixed(2)
        }));
        return processedList;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.shopCartInfo {
  background: $bgColor;
  padding: 0.16rem;
}
.shopName {
  line-height: 0.22rem;
  font-size: 0.16rem;
  color: $content-fontcolor;
}

.yen {
  display: inline-block;
  line-height: 0.2rem;
  height: 0.2rem;
  font-size: 0.1rem;
  transform: scale(0.83);
  transform-origin: right center;
}

.product {
  &__item {
    display: flex;
    width: 100%;
    padding: 0.16rem 0 0.16rem 0;
    &__img {
      height: 0.46rem;
      width: 0.46rem;
      margin-right: 0.16rem;
    }
    &__info {
      width: 100%;
      height: 100%;

      &__name {
        display: block;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: $content-fontcolor;
        margin-bottom: 0.06rem;
      }
      &__price {
        display: flex;
        position: relative;
        bottom: 0;
        height: 0.2rem;
      }
      &__priceCount {
        margin: 0 0 0 0;
        color: #e93b3b;
        font-size: 0.14rem;
        height: 0.2rem;
        line-height: 0.2rem;
      }
      &__priceTotal {
        right: 0;
        margin: 0 0 0 0;
        margin-left: auto;
        font-size: 0.14rem;
        height: 0.2rem;
        line-height: 0.2rem;
      }
    }
  }
}
.showProduct {
  width: 100%;
  background: $search-bgColor;
  color: $light-fontColor;
  font-size: 0.14rem;
  line-height: 0.28rem;
  text-align: center;
}
.arrow {
  // width: 0.1rem;
  border: solid $light-fontColor;
  border-width: 0 0.01rem 0.01rem 0;
  display: inline-block;
  margin: 0.025rem;
  padding: 0.04rem;
  transform: rotate(45deg);
}
</style>
