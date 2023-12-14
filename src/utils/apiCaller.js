import axios from "axios";
import * as Config from "./../constants/Config";
export default function productCallApi(endpoint, method, body) {
  return axios({
    method: method,
    url: `${Config.productsAPI_URL}/${endpoint}`,
    data: body,
  }).catch((error) => {
    console.log(error);
  });
}
export function accountsCallApi(endpoint, method, body) {
  return axios({
    method: method,
    url: `${Config.accountsAPI_URL}/${endpoint}`,
    data: body,
  }).catch((error) => {
    console.log(error);
  });
}
export function imageDeleteCallApi(body, endpoint) {
  return axios({
    method: "post",
    url: `${Config.deleteImage_URL}/${endpoint}`,
    data: body,
  }).catch((error) => {
    console.log(error);
  });
}
