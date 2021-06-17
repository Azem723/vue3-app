<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">
        &#xe601;
      </div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">
        {{ address.city }}{{ address.department }}{{ address.houseNumber }}
      </div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">{{ address.name }}</span>
        <span class="top__receiver__info__name">{{ address.phone }}</span>
      </div>
      <div class="iconfont top__receiver__icon" @click="handleAddressClick">
        &#xe601;
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';
import useCommonAddressEffect from '../../effects/addressEffect';

const useBtnsEffect = () => {
  const router = useRouter();
  const route = useRoute();
  const shopId = route.params.id;
  const handleBackClick = () => {
    router.push(`/shop/${shopId}`);
  };
  const handleAddressClick = () => {
    router.push({ path: '/AddressList', query: { shopId: shopId } });
  };
  return { handleBackClick, handleAddressClick };
};

const getAddressListEffect = () => {
  const route = useRoute();
  let address = computed(() => {
    const store = useStore();
    const addressList = store.state.addressList;
    const addressId = route.query.addressId ? route.query.addressId : '1';
    addressList.forEach((item) => {
      if (item._id === addressId) {
        address = item;
      }
    });
    return address;
  });
  return address;
};

export default {
  name: 'Top',
  setup() {
    const { getAddressList } = useCommonAddressEffect();
    getAddressList();
    let address = getAddressListEffect();
    const { handleBackClick, handleAddressClick } = useBtnsEffect();
    return { handleBackClick, handleAddressClick, address };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.top {
  position: relative;
  height: 1.775rem;
  &__header {
    position: relative;
    padding-top: 0.245rem;
    line-height: 0.22rem;
    color: $bgColor;
    text-align: center;
    font-size: 0.16rem;
    &__back {
      position: absolute;
      left: 0.18rem;
      font-size: 0.21rem;
    }
  }
  &__receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background: $bgColor;
    border-radius: 0.04rem;
    &__title {
      line-height: 0.22rem;
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &__address {
      line-height: 0.2rem;
      padding: 0 0.4rem 0 0.16rem;
      font-size: 0.14rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: $content-fontcolor;
    }
    &__info {
      line-height: 0.17rem;
      padding: 0.06rem 0 0.16rem 0.16rem;
      font-size: 0.12rem;
      color: $medium-fontColor;
      &__name {
        margin-right: 0.06rem;
      }
    }
    &__icon {
      transform: rotate(180deg);
      position: absolute;
      right: 0.16rem;
      top: 0.5rem;
      color: $medium-fontColor;
      font-size: 0.16rem;
    }
  }
}
</style>
