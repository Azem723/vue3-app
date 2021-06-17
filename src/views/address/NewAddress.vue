<template>
  <div class="header">
    <div class="header__icon iconfont" @click="handleClickBack">&#xe601;</div>
    <div class="header__title">
      {{ id ? '编辑收货地址' : '新建收货地址' }}
    </div>
    <div class="header__new" @click="handleAddressSubmit">保存</div>
  </div>
  <div class="wrapper">
    <div class="address">
      <div class="address__detail">
        所在城市：<input
          class="address__detail__input"
          placeholder="如北京市"
          v-model="myAddress.city"
        />
      </div>
      <div class="address__detail">
        小区/大厦/学校：<input
          class="address__detail__input"
          placeholder="如理工大学国防科技园"
          v-model="myAddress.department"
        />
      </div>
      <div class="address__detail">
        楼号-门牌号：<input
          class="address__detail__input"
          placeholder="A号楼B层"
          v-model="myAddress.houseNumber"
        />
      </div>
      <div class="address__detail">
        收货人：<input
          class="address__detail__input"
          placeholder="请填写收货人的姓名"
          v-model="myAddress.name"
        />
      </div>
      <div class="address__lastdetail">
        联系电话：<input
          class="address__detail__input"
          placeholder="请填写收货手机号"
          v-model="myAddress.phone"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import useCommonAddressEffect from '../../effects/addressEffect';

const useHeaderEffect = () => {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };
  return handleClickBack;
};

const useAddressEffect = (id) => {
  const router = useRouter();
  const store = useStore();
  const { addressList } = store.state;

  const myAddress = reactive({
    city: '',
    department: '',
    houseNumber: '',
    name: '',
    phone: '',
    _id: ''
  });
  console.log(addressList)
  if (id) {
    const addressId = id;
    addressList.forEach((item) => {
      if (item._id === addressId) {
        const { city, department, houseNumber, name, phone } = item;
        myAddress.city = city;
        myAddress.department = department;
        myAddress.houseNumber = houseNumber;
        myAddress.name = name;
        myAddress.phone = phone;
        myAddress._id = addressId
      }
    });
  } else {
    const addressId = String(addressList.length + 1);
    myAddress._id = addressId;
  }

  const { addAddress, editAddress } = useCommonAddressEffect();
  const handleAddressSubmit = () => {
    if (!Object.values(myAddress).includes('')) {
      if (id) {
        editAddress(myAddress);
        router.back();
      } else {
        addAddress(myAddress);
        router.back();
      }
    }
  };
  return { handleAddressSubmit, myAddress };
};

const useIsEditEffect = () => {
  const route = useRoute();
  const id = route?.params?.id;
  return { id };
};

export default {
  name: 'newAddress',

  setup() {
    const handleClickBack = useHeaderEffect();
    const { id } = useIsEditEffect();
    const { handleAddressSubmit, myAddress } = useAddressEffect(id);

    return { handleClickBack, myAddress, handleAddressSubmit, id };
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
  padding-top: 0.12rem;
  overflow: scroll;
}
.address {
  padding: 0 0.18rem 0 0.18rem;
  background: $bgColor;
  &__detail {
    line-height: 0.44rem;
    border-bottom: 0.01rem solid $content-bgColor;
    font-size: 0.14rem;
    color: $medium-fontColor;
    &__input {
      padding: 0;
      background: none;
      border: none;
      outline: none;
      color: $medium-fontColor;
      width: 60%;
      &::placeholder {
        color: #bdbdbd;
      }
    }
  }
  &__lastdetail {
    line-height: 0.44rem;
    font-size: 0.14rem;
    color: $medium-fontColor;
  }
}
</style>
