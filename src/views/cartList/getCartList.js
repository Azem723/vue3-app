import { useStore } from 'vuex'

export const getCartListEffect = () => {
  const store = useStore();
  const cartList = store.state.cartList;
  return { cartList };
};
