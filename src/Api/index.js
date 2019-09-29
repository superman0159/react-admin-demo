import ajaxs from "./ajax";

const BASE_URL = "";

//Admin Login
export const GetAdmin = params => ajaxs(BASE_URL + "/c/login", params, "POST");
//请求管理员列表
export const GetAdminData = () => ajaxs(BASE_URL + "/c/leaderlist");
//添加管理员
export const addAdminData = params =>
  ajaxs(BASE_URL + "/c/add/leaderlist", params, "POST");
//删除一条管理员
export const removeAdminData = id => ajaxs(BASE_URL + "/c/leader/remove/" + id);
// //添加一条商品
export const addShopData = params =>
  ajaxs(BASE_URL + "/c/add/shoppinglist", params, "POST");
//获取商品列表
export const GetShopListData = () => ajaxs(BASE_URL + "/c/shoppinglist");
//获取商品券码列表
export const GetShopDiscountListData = () =>
  ajaxs(BASE_URL + "/c/shopdiscountlist");
// 添加商品对应券码
export const addShopDiscountData = params =>
  ajaxs(BASE_URL + "/c/add/shopingdiscount", params, "POST");
// 是否上架
export const isAddShopData = params =>
  ajaxs(BASE_URL + "/c/shop/edit", params, "POST");
// 添加商品优惠券
export const addShopSaleData = params =>
  ajaxs(BASE_URL + "/c/add/shopsalelist", params, "POST");
//获取抵扣券列表
export const GetShopSaleListData = () => ajaxs(BASE_URL + "/c/shopp/sale/list");
