import { createStore } from 'vuex';

const setLocalCartList = (state) => {
  const { cartList } = state;
  const cartListString = JSON.stringify(cartList);
  localStorage.cartList = cartListString;
};
//  {shopId: {shopName:'',paroductList:{ productId:{} }}}
const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList);
  } catch (e) {
    return {};
  }
  // return JSON.parse(localStorage.cartList || '{}');
  // return localStorage.cartList ? JSON.parse(localStorage.cartList) : {};
};

const setLocalAddressList = (state) => {
  const { addressList } = state;
  const addressListString = JSON.stringify(addressList);
  localStorage.addressList = addressListString;
};

const getLocalAddressList = () => {
  try {
    return JSON.parse(localStorage.addressList);
  } catch (e) {
    return [];
  }
};

export default createStore({
  state: {
    cartList: getLocalCartList(),
    addressList: []
  },
  mutations: {
    // 先尝试获取shopId对应的数据，如果有，count+=1，如果没有就构建一个商品
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo, num } = payload;
      let shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      };
      let product = shopInfo.productList[productId];
      if (!product) {
        productInfo.count = 0;
        product = productInfo;
      }

      product.count += num;
      num > 0 && (product.check = true);
      product.count < 0 && (product.count = 0);
      shopInfo.productList[productId] = product;

      state.cartList[shopId] = shopInfo;
      // console.log(state.cartList)

      product.totalPrice = (product.count * product.price).toFixed(2);
      setLocalCartList(state);
    },
    // Object.prototype.hasOwnProperty.call(state.cartList, [shopId])

    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      const productItem = state.cartList[shopId].productList[productId];
      productItem.check = !productItem.check;
      setLocalCartList(state);
    },

    cleanCartProducts(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].productList = {};
      setLocalCartList(state);
    },

    setCartItemsChecked(state, payload) {
      const { shopId } = payload;
      const products = state.cartList[shopId].productList;
      if (products) {
        for (let key in products) {
          const product = products[key];
          product.check = true;
        }
      }
      setLocalCartList(state);
    },

    changeShopName(state, payload) {
      const { shopId, shopName } = payload;
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state);
    },

    clearCartData(state, shopId) {
      state.cartList[shopId].productList = {};
    },

    getAdressList(state, payload) {
      state.addressList = payload;
    },
    addAddress(state, payload) {
      let newAdress = payload;
      // newAdress._id = toString(state.addressList.length + 1);
      let date = new Date();
      newAdress.createdAt = date;
      newAdress.updatedAt = date;
      state.addressList.push(newAdress);
    },
    editAddress(state, payload) {
      let address = payload;
      const addressId = address._id;
      let date = new Date();
      state.addressList.forEach((item) => {
        if (item._id === addressId) {
          item.city = address.city;
          item.department = address.department;
          item.houseNumber = address.houseNumber;
          item.name = address.name;
          item.phone = address.phone;
          item.updatedAt = date;
        }
      });
    }
  },
  actions: {},
  modules: {}
});
