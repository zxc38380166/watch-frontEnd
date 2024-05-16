export function calculutePercentage(
  value: number,
  percentage: number,
  floor?: boolean
): number {
  // 第一個參數是值, 第二個參數是百分比
  if (floor) {
    return Math.floor(value * (percentage / 100));
  }
  return value * (percentage / 100);
}

export function replaceStrIndexToUpperCase(
  string: string,
  index: number
): string {
  if (index < 0 || index > string.length) {
    return string;
  }
  const stringData = [...string];
  stringData[index] = stringData[index].toUpperCase();
  return stringData.toString().split(",").join("");
}

export function formatThousandth(number: number): string {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function shuffleArray(arr: Array<object | string | number>): void {
  arr.sort(() => 0.5 - Math.random())
};