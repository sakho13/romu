import {
  RomuWorkoutPart,
  RomuWorkoutPartEnum,
  RomuWorkoutType,
  RomuWorkoutTypeEnum,
} from "@/types/WorkoutType"

export function cvRomuWorkoutPartByInt(part: number): RomuWorkoutPartEnum {
  if (part in RomuWorkoutPart) return part as RomuWorkoutPartEnum
  return 0
}

export function cvRomuWorkoutTypeByInt(type: number): RomuWorkoutTypeEnum {
  if (type in RomuWorkoutType) return type as RomuWorkoutTypeEnum
  return 1
}

export function cvRomuWorkoutPartNameByEnum<P extends RomuWorkoutPartEnum>(
  part: P,
): (typeof RomuWorkoutPart)[P] {
  return RomuWorkoutPart[part]
}

export function cvRomuWorkoutTypeNameByEnum<T extends RomuWorkoutTypeEnum>(
  type: T,
): (typeof RomuWorkoutType)[T] {
  return RomuWorkoutType[type]
}
