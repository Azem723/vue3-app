<template>
  <div class="order">
    <div class="order__price">
      实付金额 <b>&yen;{{ calculations.price }}</b>
    </div>
    <div class="order__btn" @click="() => handleShowConfirmChange(true)">
      提交订单
    </div>
  </div>
  <div
    class="mask"
    v-show="showConfirm"
    @click="() => handleShowConfirmChange(false)"
  >
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleComfirmOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleComfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
  <Toast class="toast" v-if="show" :message="toastMessage" />
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useCommonCartEffect } from '../../effects/cartEffect';
import { post } from '../../utils/request';
import Toast, { useToastEffect } from '../../components/Toast';
import useCommonAddressEffect from '../../effects/addressEffect';

const useMakeOrderEffect = (shopId, shopName, productList) => {
  const router = useRouter();
  const store = useStore();

  const { show, toastMessage, showToast } = useToastEffect();

  const handleComfirmOrder = async (isCanceled) => {
    const products = Object.values(productList.value).map((item) => ({
      id: parseInt(item._id),
      num: item.count
    }));
    try {
      const result = await post('api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      });
      if (result?.errno === 0) {
        store.commit('clearCartData', shopId);
        router.push({ name: 'OrderList' });
      } else {
        showToast('订单提交失败');
      }
    } catch (e) {
      showToast('订单提交失败');
    }
  };

  return { show, toastMessage, handleComfirmOrder };
};

const useShowMaskEffect = () => {
  const showConfirm = ref(false);
  const handleShowConfirmChange = (status) => {
    showConfirm.value = status;
  };
  return { showConfirm, handleShowConfirmChange };
};

export default {
  name: 'Order',
  components: { Toast },

  setup() {
    const route = useRoute();
    const shopId = parseInt(route.params.id, 10);
    const { calculations, shopName, productList } = useCommonCartEffect(shopId);
    const { show, toastMessage, handleComfirmOrder } = useMakeOrderEffect(
      shopId,
      shopName,
      productList
    );
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect();

    return {
      showConfirm,
      calculations,
      handleComfirmOrder,
      show,
      toastMessage,
      handleShowConfirmChange
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.order {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  background: $bgColor;
  &__price {
    flex: 1;
    padding-left: 0.24rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
  }
  &__btn {
    width: 0.98rem;
    text-align: center;
    font-size: 0.14rem;
    color: $bgColor;
    background: #4fb0f9;
  }
}

.mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3.01rem;
    height: 1.57rem;
    background: $bgColor;
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      margin: 0.24rem 0 0 0;
      line-height: 0.25rem;
      font-size: 0.18rem;
      color: $content-fontcolor;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $medium-fontColor;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem 0 0.58rem;
      width: 1.84rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      border: 0.01rem solid #4fb0f9;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      &--first {
        margin-right: 0.12rem;
        color: #4fb0f9;
      }
      &--last {
        margin-left: 0.12rem;
        color: $bgColor;
        background: #4fb0f9;
      }
    }
  }
}

.toast {
  z-index: 2;
}
</style>
