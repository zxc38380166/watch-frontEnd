import { InjectionKey } from "vue";

export interface Global {
  PERCENTAGE: number;
  COUPONCODE: string;
  DISCOUNTMONEY: number;
}

export const globalKey: InjectionKey<Global> = Symbol();

export const globalData = {
  PERCENTAGE: 100,
  DISCOUNTMONEY: 500,
  COUPONCODE: 'OtisSTOREGOOD'
};
