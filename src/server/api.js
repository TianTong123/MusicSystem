import { req } from "./req";
import api_login from "@/views/login/api_login";
import api_home from "@/views/home/api_home";
import api_examine from "@/views/examine/api_examine";
import api_menu from "@/views/menu/api_menu";
import api_right from "@/views/right/api_right";
import api_user from "@/views/user/api_user";
import api_music from "@/views/music/api_music";
import api_recommend from "@/views/recommend/api_recommend";
let api = {
  // Demo Code
  // // 重置个人信息
  // personalReset: data => req({
  //     baseUrl: "osp",
  //     method: "post",
  //     url: "ralAccountSupplier/personalReset",
  //     params: data
  // }),
  // editPassword: data =>req({
  //     baseUrl: "auth",
  //     method: "put",
  //     url: `authUser?userkey=${data.userkey}&tokenkey=${data.tokenkey}`,
  //     params: data
  // }), //修改用户密码
  // getCompanyInfo: data =>
  //   req({
  //     baseUrl: "osp",
  //     method: "get",
  //     url: "tblAccount/companyInfo",
  //     params: data,
  //     isOriginalGET: true
  //   }),
  // 下载文件1
  // downLoadFile: data =>
  //   req({
  //     baseUrl: "osp",
  //     method: "post",
  //     url: "uploadFastdfs/downFile",
  //     params: data
  //   }),
  // // 下载文件
  getFileFlow: data =>
    req({
      baseUrl: "testUrl",
      method: "get",
      url: "osp/tblResumeBase/downloadFlow",
      params: data,
      isOriginalGET: true,
      responseType: "arraybuffer"
    }),
};
api = Object.assign(
  api,
  api_login,
  api_home,
  api_examine,
  api_menu,
  api_right,
  api_user,
  api_music,
  api_recommend,
);

export default api;
