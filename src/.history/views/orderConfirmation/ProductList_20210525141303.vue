<template>
  <div class="products">
    <div class="products__title">{{ shopName }}</div>
    <div class="products__wrapper">
      <div class="products__list">
        <template v-for="item in productList" :key="item._id">
          <div class="products__item" v-if="item.count > 0">
            <img class="products__item__img" :src="item.imgUrl" />
            <div class="products__item__detail">
              <h4 class="products__item__title">
                {{ item.name }}
              </h4>
              <p class="products__item__price">
                <span class="products__item__yen"> &yen; </span>
                {{ item.price }} x {{ item.count }}
                <span class="products__item__total">
                  <span class="products__item__yen"> &yen; </span>
                  {{ (item.price * item.count).toFixed(2) }}
                </span>
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useCommonCartEffect } from '../../effects/cartEffect';

export default {
  name: 'ProductList',

  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { productList, shopName } = useCommonCartEffect(shopId);

    return { productList, shopName };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.products {
  margin: 0.16rem 0.18rem 0.16rem 0.18rem;
  background: $bgColor;
  &__title {
    padding: 0.16rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &__wrapper {
    overflow-y: scroll;
    margin: 0 0.18rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.16rem;
    top: 2.435rem;
  }
  // 使用viewport实现父元素高度不定时，子元素overflow，不用再外层再包裹一个wrapper
  // &__list {
  //   max-height: calc(100vh - 2.77rem);
  //   overflow-y: scroll;
  // }
  &__list {
    background: $bgColor;
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0 0.16rem 0.16rem 0.16rem;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detail {
      flex: 1;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      display: flex;
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $highlight-fontColor;
    }
    &__total {
      text-align: right;
      flex: 1;
      color: $dark-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
  }
}
</style>
