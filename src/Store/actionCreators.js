import * as Types from "./action-Types";
import { error } from "../Components/Info";
import {
  GetAdmin,
  GetAdminData,
  GetShopListData,
  GetShopDiscountListData,
  GetShopSaleListData
} from "./../Api/index";

// 获取首页数据
// export const getHomeAction = (homeDate) => ({
//     type: contents.INIT_HOME_DATA,
//     homeDate
// })
//登陆
export const LoginAction = (data, callback) => {
  return dispatch => {
    GetAdmin(data)
      .then(res => {
        if (res.data.status_code === 1) {
          const payload = res.data.message;
          dispatch({
            type: Types.ADMIN_LOGIN,
            payload
          });
          callback && callback(payload.token);
        } else {
          error("用户名或密码输入错误，请重新输入");
        }
      })
      .catch(err => {
        error("用户数据请求错误,请刷新重试");
      });
  };
};

// 获取首页管理员列表数据
export const AdminAction = callback => {
  return dispatch => {
    GetAdminData()
      .then(res => {
        if (res.data.status_code === 200) {
          const payload = res.data.result;
          dispatch({
            type: Types.ADMIN_LIST,
            payload
          });
          callback && callback(true);
        } else {
          error("首页数据请求失败");
        }
      })
      .catch(() => {
        // 数据还未完全封装好 现在只做简单的数据劫持
        error("首页数据请求失败！");
      });
  };
};

// 获取商品列表列表数据
export const ShopListAction = () => {
  return dispatch => {
    GetShopListData()
      .then(res => {
        if (res.data.status_code === 200) {
          const payload = res.data.result;
          dispatch({
            type: Types.SHOP_LIST,
            payload
          });
        } else {
          error("商品数据请求失败");
        }
      })
      .catch(() => {
        // 数据还未完全封装好 现在只做简单的数据劫持
        error("商品数据请求失败！");
      });
  };
};

// 获取商品券码列表列表数据
export const ShopDisListAction = () => {
  return dispatch => {
    GetShopDiscountListData()
      .then(res => {
        if (res.data.status_code === 200) {
          const payload = res.data.result;
          dispatch({
            type: Types.SHOP_DISCOUNT_LIST,
            payload
          });
        } else {
          error("券码数据请求失败");
        }
      })
      .catch(() => {
        // 数据还未完全封装好 现在只做简单的数据劫持
        error("券码数据请求失败！");
      });
  };
};

// 获取商品抵扣券列表数据
export const ShopSaleAction = () => {
  return dispatch => {
    GetShopSaleListData()
      .then(res => {
        if (res.data.status_code === 200) {
          const payload = res.data.result;
          dispatch({
            type: Types.SHOP_SALE_LIST,
            payload
          });
        } else {
          error("抵扣券数据请求失败");
        }
      })
      .catch(() => {
        // 数据还未完全封装好 现在只做简单的数据劫持
        error("抵扣券数据请求失败！");
      });
  };
};

