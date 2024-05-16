import axioxInstance from ".";
import { AxiosResponse } from "axios";

export function addProduct(data: any): Promise<AxiosResponse<any, any>> {
  return axioxInstance({
    url: "/products",
    method: "post",
    data: data,
  });
}

export function getProduct(params: any = {}): Promise<AxiosResponse<any, any>> {
  return axioxInstance({
    url: `/products`,
    method: "get",
    params: params
  });
}
