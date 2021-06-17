<template>
  <div class="addressList">
    <div class="addressList__info">
      <div class="addressList__person">
        <div class="addressList__person__name">{{ item.name }}</div>
        <div class="addressList__person__phone">{{ item.phone }}</div>
      </div>
      <div class="addressList__address">
        {{ item.city }} {{ item.department }} {{ item.houseNumber }}
      </div>
    </div>
    <div
      class="addressList__icon iconfont"
      @click.stop="() => handleEditClick(item._id)"
    >
      &#xe601;
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Address',
  props: ['item'],
  setup() {
    const router = useRouter();
    const handleEditClick = (id) => {
      router.push(`/addressList/Address/${id}`);
    };
    return { handleEditClick };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.addressList {
  position: relative;
  padding: 0.18rem 0.16rem 0.18rem 0.16rem;
  background: $bgColor;
  display: flex;
  margin-bottom: 0.16rem;
  &__person {
    display: flex;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: $light-fontColor;
    &__phone {
      margin-left: 0.66rem;
    }
  }
  &__address {
    margin-top: 0.08rem;
    line-height: 0.2rem;
    height: 0.4rem;
    width: 2.6rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    // -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  &__icon {
    position: absolute;
    right: 0.16rem;
    line-height: 0.68rem;
    transform: rotate(180deg);
    font-size: 0.2rem;
    color: $light-fontColor;
    // transform-origin: center center;
  }
}
</style>
