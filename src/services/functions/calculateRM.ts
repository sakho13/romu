/**
 * RM計算を行う関数(小数点以下1桁まで)
 *
 * `RM = (weight * reps / 40 + weight)`
 *
 * @param weight 重量
 * @param reps 回数
 * @returns RM
 */
export function calculateRM(weight: number, reps: number): number {
  return Math.round(((weight * reps) / 40 + weight) * 10) / 10
}
