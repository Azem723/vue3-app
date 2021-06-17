<template>
  <div class="header">
    <div class="header__icon iconfont" @click="handleClickBack">&#xe601;</div>
    <div class="header__title">管理收货地址</div>
    <div class="header__new" @click="handleClickNew">新建</div>
  </div>
  <div class="wrapper">
    <div class="wrapper__title">我的收货地址</div>
    <Address
      v-for="item in addressList"
      :key="item._id"
      @click="() => handleChooseAddress(item._id)"
      :item="item"
    />
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';
import Address from './Address';
import useCommonAddressEffect from '../../effects/addressEffect';

const useHeaderEffect = () => {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };
  const handleClickNew = () => {
    router.push('/addressList/Address');
  };
  return { handleClickBack, handleClickNew };
};

const getAddressListEffect = () => {
  const addressList = computed(() => {
    const store = useStore();
    const addressList = store.state.addressList;
    return addressList;
  });
  return addressList;
};

const useChooseAddressEffect = () => {
  const route = useRoute();
  const router = useRouter();
  const shopId = route.query.shopId;
  const handleChooseAddress = (addressId) => {
    if (shopId) {
      router.push({
        path: `/orderConfirmation/${shopId}`,
        query: { addressId: addressId }
      });
    }
  };
  return handleChooseAddress;
};

export default {
  name: 'AddressList',
  components: { Address },
  setup() {
    const { getAddressList } = useCommonAddressEffect();
    getAddressList();
    const { handleClickBack, handleClickNew } = useHeaderEffect();

    const addressList = getAddressListEffect();
    const handleChooseAddress = useChooseAddressEffect();
    return {
      handleClickBack,
      handleClickNew,
      addressList,
      handleChooseAddress
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.header {
  display: flex;
  position: relative;
  line-height: 0.44rem;
  font-size: 0.16rem;
  color: $content-fontcolor;
  background: $bgColor;
  &__icon {
    position: absolute;
    left: 0.18rem;
    color: #b6b6b6;
    font-size: 0.2rem;
    width: 0.28rem;
    text-align: left;
  }
  &__title {
    flex: 1;
    text-align: center;
  }
  &__new {
    position: absolute;
    right: 0.18rem;
    font-size: 0.14rem;
    width: 0.28rem;
  }
}
.wrapper {
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f8f8f8;
  padding: 0.16rem 0.18rem 0 0.18rem;
  overflow: scroll;
  &__title {
    line-height: 0.2rem;
    margin-bottom: 0.12rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
  }
}
</style>
