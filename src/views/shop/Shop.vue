<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe601;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe600;</span>
        <input class="search__content__input" placeholder="请输入商品名称" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-if="item.imgUrl" />
    <Content :shopName="item.name" />
  </div>
  <Cart />
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { get } from '../../utils/request';
import ShopInfo from '../../components/ShopInfo';
import Content from './Content';
import Cart from './Cart';

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute();
  const data = reactive({ item: {} }); // 用reactive对象下的一个属性承载传输的数据
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data; // 对reactive对象下的属性进行更新（比较简练的方式）
    }
  };
  const { item } = toRefs(data);
  return { item, getItemData };
};

const useBackRouterEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.push('/');
  };
  return { handleBackClick };
};

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup() {
    const { item, getItemData } = useShopInfoEffect();
    const { handleBackClick } = useBackRouterEffect();

    getItemData();

    return { item, handleBackClick };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.14rem 0 0.04rem 0;
  line-height: 0.32rem;
  &__back {
    width: 0.3rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: 0.16rem;
    &__icon {
      display: block;
      width: 0.44rem;
      text-align: center;
      color: $search-fontColor;
    }
    &__input {
      display: block;
      flex: 1;
      // width: 100%;
      padding-right: 0.2rem;
      border: none;
      outline: none;
      background: none;
      height: 0.32rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
