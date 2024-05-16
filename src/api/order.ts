import axioxInstance from ".";
import { AxiosResponse } from "axios";

export function sendOrder(params: any = {}): Promise<AxiosResponse<any, any>> {
  return axioxInstance({
    url: `/order`,
    method: "post",
    data: params,
  });
}

export function getOrder(params: any = {}): Promise<AxiosResponse<any, any>> {
  return axioxInstance({
    url: `/order/${params}`,
    method: "get",
  });
}
