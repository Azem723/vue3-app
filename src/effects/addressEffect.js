import { useStore } from 'vuex';
import { get } from '../utils/request';

const useCommonAddressEffect = () => {
  const store = useStore();
  const getAddressList = async (update) => {
    const addressList = store.state.addressList;
    if (update || !addressList.length) {
      const result = await get('/api/user/address');
      if (result?.errno === 0 && result?.data?.length !== 0) {
        store.commit('getAdressList', result.data);
      }
    }
  };
  const addAddress = (item) => {
    if (item) {
      store.commit('addAddress', item);
    }
  };
  const editAddress = (item) => {
    if (item) {
      store.commit('editAddress', item);
    }
  };
  return { getAddressList, addAddress, editAddress };
};

export default useCommonAddressEffect;
