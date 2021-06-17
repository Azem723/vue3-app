<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      v-for="item in nearbyList"
      :to="`/shop/${item._id}`"
      :key="item._id"
      :item="item"
    >
      <ShopInfo :item="item" />
    </router-link>
    <!-- 循环展示nearbyList中的每一项item，key等于id，将item传递给子组件 -->
  </div>
</template>

<script>
import { ref } from 'vue';
import { get } from '../../utils/request';
import ShopInfo from '../../components/ShopInfo';

const useNearbyListEffect = () => {
  const nearbyList = ref([]);
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list');
    // TypeScript语法result?.errno表示result对象中可能不存在errno
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data;
    }
  };
  return { nearbyList, getNearbyList };
};

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup() {
    const { nearbyList, getNearbyList } = useNearbyListEffect();
    getNearbyList();
    return { nearbyList };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  a {
    text-decoration: none;
  }
}
</style>
