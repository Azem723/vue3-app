<template>
  <div class="content">
    <div class="category">
      <div
        :class="{
          category__item: true,
          'category__item--active': currentTab === item.tab
        }"
        v-for="item in categories"
        :key="item.tab"
        @click="() => handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">
            {{ item.name }}
          </h4>
          <p class="product__item__sales">月售{{ item.sales }}件</p>
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
                changeCartItem(shopId, item._id, item, -1, shopName);
              }
            "
            >&#xe781;</span
          >
          {{ getProductCartCount(shopId, item._id) }}
          <!-- {{ cartList?.[shopId]?.productList?.[item._id]?.count || 0 }} -->
          <span
            class="product__number__plus iconfont"
            @click="
              () => {
                changeCartItem(shopId, item._id, item, 1, shopName);
              }
            "
            >&#xe7ba;</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { get } from '../../utils/request';
import { useCommonCartEffect } from '../../effects/cartEffect';

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '休闲食品', tab: 'snack' },
  { name: '时令蔬菜', tab: 'veg' },
  { name: '肉蛋家禽', tab: 'meat' }
];

// Tab切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab);
  const handleTabClick = (tab) => {
    currentTab.value = tab;
  };
  return { currentTab, handleTabClick };
};

// 列表内容相关逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] });
  // 获取列表内容
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    });
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data;
    }
  };

  watchEffect(() => {
    getContentData();
  });

  const { list } = toRefs(content);
  return { list };
};

// 购物车相关逻辑
const useCartEffect = () => {
  const store = useStore();
  const { changeCartItemInfo, cartList } = useCommonCartEffect();
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName });
  };
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num);
    changeShopName(shopId, shopName);
  };
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0;
  };
  return { cartList, changeCartItem, getProductCartCount };
};

export default {
  name: 'Content',
  props: ['shopName'],
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { currentTab, handleTabClick } = useTabEffect();
    const { list } = useCurrentListEffect(currentTab, shopId);
    const { cartList, changeCartItem, getProductCartCount } = useCartEffect();

    return {
      categories,
      currentTab,
      handleTabClick,
      list,
      shopId,
      cartList,
      changeCartItem,
      getProductCartCount
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
}
.category {
  overflow-y: scroll;
  width: 0.76rem;
  background: $search-bgColor;
  &__item {
    text-align: center;
    font-size: 0.14rem;
    color: $content-fontcolor;
    line-height: 0.4rem;
    &--active {
      background: #ffffff;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem 0 0.18rem;
    border-bottom: solid $content-bgColor 0.01rem;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__sales {
      margin: 0.06rem 0 0.06rem 0;
      font-size: 0.12rem;
      line-height: 0.16rem;
      color: $content-fontcolor;
    }
    &__price {
      margin: 0;
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
      bottom: 0.12rem;
      &__minus,
      &__plus {
        font-size: 0.2rem;
        position: relative;
        top: 0.02rem;
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
</style>
