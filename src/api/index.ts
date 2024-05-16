import axios from "axios";
import { addProduct, getProduct } from "./product";
import { sendOrder, getOrder } from "./order";
import { AxiosInstance, AxiosResponse } from "axios";

const axioxInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_CLOUD_BASE_URL,
  timeout: 30000,
  headers: { "X-Custom-Header": "foobar" },
});

const retryNumber = 3;
const retryTimeout = 3000;

function judgeConnection(
  api: (data: any) => Promise<AxiosResponse<any, any>>,
  apiParams: string,
  currentRetryNumber: number
) {
  const isFirstConnection = currentRetryNumber === retryNumber - 1;
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        api(apiParams)
          .then((response: any) => resolve(response))
          .catch((err: any) => reject(err));
      },
      isFirstConnection ? 0 : retryTimeout
    );
  });
}

export function retryApi(api: any, apiParams: string) {
  return new Promise(async (resolve, reject) => {
    let currentRetryNumber = retryNumber;
    while (currentRetryNumber--) {
      try {
        const response = await judgeConnection(
          api,
          apiParams,
          currentRetryNumber
        );
        resolve(response);
        break;
      } catch (err) {
        if (!currentRetryNumber) {
          reject(err);
        }
      }
    }
  });
}

export default axioxInstance;
export const apiAddProduct: (data: any) => Promise<AxiosResponse<any, any>> =
  addProduct;
export const apiGetProduct: (data: any) => Promise<AxiosResponse<any, any>> =
  getProduct;
export const apiSendOrder: (data: any) => Promise<AxiosResponse<any, any>> =
  sendOrder;
export const apiGetOrder: (data: any) => Promise<AxiosResponse<any, any>> =
  getOrder;
