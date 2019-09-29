import * as Types from "./action-Types";

const initvalState = {
  //超级管理员
  admin: {},
  //管理成员列表
  adminlist: [],
  //商品列表
  shopList: [],
  //商品券码列表
  shopdiscountList: [],
  //商品抵扣券列表
  shopsaleList: [],
};

export default (state = initvalState, action) => {
  console.log(action);
  switch (action.type) {
    case Types.ADMIN_LOGIN:
      const newstate = JSON.parse(JSON.stringify(initvalState));
      newstate.admin = action.payload;
      // 登陆数据本地化
      sessionStorage.setItem("userData", JSON.stringify(action.payload));
      return newstate;
    case Types.ADMIN_LIST:
      const adminstate = JSON.parse(JSON.stringify(initvalState));
      adminstate.adminlist = action.payload;
      return adminstate;
    case Types.SHOP_LIST:
      const shopliststate = JSON.parse(JSON.stringify(initvalState));
      shopliststate.shopList = action.payload;
      return shopliststate;
    case Types.SHOP_DISCOUNT_LIST:
      const shopdisliststate = JSON.parse(JSON.stringify(initvalState));
      shopdisliststate.shopdiscountList = action.payload;
      return shopdisliststate;
    case Types.SHOP_SALE_LIST:
      const shopsalestate = JSON.parse(JSON.stringify(initvalState));
      shopsalestate.shopsaleList = action.payload;
      return shopsalestate;
    default:
      return state;
  }
};
