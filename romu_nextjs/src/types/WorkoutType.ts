export type RomuWorkout = {
  id: string
  name: string
  memo: string
  type: RomuWorkoutTypeEnum
  part: RomuWorkoutPartEnum
  isDefault: boolean
}

export const RomuWorkoutType = {
  1: "バーベル",
  2: "ダンベル",
  3: "マシン",
  4: "ケーブル",
  10: "自重",
  9: "有酸素",
} as const

export type RomuWorkoutTypeEnum = keyof typeof RomuWorkoutType

export const RomuWorkoutPart = {
  0: "指定なし",
  1: "胸",
  2: "背中",
  3: "肩",
  4: "腕",
  5: "脚",
  6: "腹",
}

export type RomuWorkoutPartEnum = keyof typeof RomuWorkoutPart
