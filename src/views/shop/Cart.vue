<template>
  <div
    class="mask"
    v-if="showCart && calculations.total > 0"
    @click="handleCartShowChange"
  />
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total">
      <div class="product__header">
        <div
          class="product__header__all"
          @click="() => setCartItemsChecked(shopId)"
        >
          <span
            class="product__header__icon iconfont"
            v-html="calculations.allChecked ? '&#xe652;' : '&#xe651;'"
          />全选
        </div>
        <div class="product__header__clear">
          <span
            class="product__header__clear__btn"
            @click="() => cleanCartProducts(shopId)"
            >清空购物车</span
          >
        </div>
      </div>
      <div class="product__item" v-for="item in productList" :key="item._id">
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe652;' : '&#xe651;'"
          @click="() => changeCartItemChecked(shopId, item._id)"
        />
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">
            {{ item.name }}
          </h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price
            }}<span class="product__item__origin"
              >&yen;{{ item.oldPrice }}</span
            >
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, -1);
              }
            "
            >&#xe781;</span
          >
          {{ item.count || 0 }}
          <span
            class="product__number__plus iconfont"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, 1);
              }
            "
            >&#xe7ba;</span
          >
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        <span class="check__info__text">总计：</span
        ><span class="check__info__price">&yen; {{ calculations.price }}</span>
      </div>
      <div class="check__btn" v-show="calculations.total > 0">
        <router-link :to="{ path: `/orderConfirmation/${shopId}` }"
          >去结算</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useCommonCartEffect } from '../../effects/cartEffect';

const useCartEffect = (shopId) => {
  const store = useStore();
  const {
    cartList,
    changeCartItemInfo,
    productList,
    calculations
  } = useCommonCartEffect(shopId);

  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId });
  };

  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId });
  };

  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId });
  };

  return {
    calculations,
    productList,
    cartList,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked
  };
};

// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false);
  const handleCartShowChange = () => {
    showCart.value = !showCart.value;
  };
  return { showCart, handleCartShowChange };
};

export default {
  name: 'Cart',
  setup() {
    const route = useRoute();
    const shopId = route.params.id;

    const { showCart, handleCartShowChange } = toggleCartEffect();

    const {
      calculations,
      productList,
      cartList,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked
    } = useCartEffect(shopId);

    return {
      shopId,
      calculations,
      productList,
      cartList,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      showCart,
      handleCartShowChange
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bgColor;
  z-index: 2;
}

.product {
  overflow-y: scroll;
  flex: 1;
  background: $bgColor;
  &__header {
    display: flex;
    line-height: 0.52rem;
    border-bottom: 0.01rem solid $content-bgColor;
    padding: 0 0.184rem 0 0.18rem;
    &__icon {
      margin-right: 0.084rem;
      color: $btn-bgColor;
      font-size: 0.2rem;
    }
    &__all {
      display: flex;
      width: 0.64rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
    }
    &__clear {
      flex: 1;
      text-align: right;
      font-size: 0.14rem;
      color: $content-fontcolor;
      &__clear {
        display: inline-block;
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.1rem 0;
    margin: 0 0.16rem 0 0.18rem;
    border-bottom: solid $content-bgColor 0.01rem;
    &__checked {
      margin-right: 0.164rem;
      line-height: 0.5rem;
      color: $btn-bgColor;
      font-size: 0.2rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $highlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      line-height: 0.2rem;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.245rem;
      &__minus,
      &__plus {
        position: relative;
        top: 0.02rem;
        font-size: 0.2rem;
      }
      &__minus {
        color: $medium-fontColor;
        margin-right: 0.05rem;
      }
      &__plus {
        color: $btn-bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}

.check {
  display: flex;
  box-sizing: border-box;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  line-height: 0.49rem;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      left: 0.5rem;
      top: 0.04rem;
      padding: 0 0.04rem;
      min-width: 0.1rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background: $highlight-fontColor;
      border-radius: 0.5rem;
      font-size: 0.12rem;
      text-align: center;
      color: $bgColor;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    display: flex;
    color: $content-fontcolor;
    font-size: 0.12rem;
    .__text {
      margin: auto;
    }
    &__price {
      color: $highlight-fontColor;
      font-size: 0.18rem;
    }
  }
  &__btn {
    width: 0.98rem;
    line-height: 0.49rem;
    background: #4fb0f9;
    text-align: center;
    color: $bgColor;
    font-size: 0.14rem;
    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>
