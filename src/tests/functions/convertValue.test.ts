import {
  cvRomuWorkoutPartByInt,
  cvRomuWorkoutPartNameByEnum,
  cvRomuWorkoutTypeByInt,
  cvRomuWorkoutTypeNameByEnum,
} from "@/services/functions/convertValue"

describe("services/functions/convertValue", () => {
  describe("cvRomuWorkoutPartByInt", () => {
    test("part is in RomuWorkoutPart", () => {
      const result = cvRomuWorkoutPartByInt(1)
      expect(result).toBe(1)
    })

    test("part is not in RomuWorkoutPart", () => {
      const result = cvRomuWorkoutPartByInt(7)
      expect(result).toBe(0)
    })
  })

  describe("cvRomuWorkoutTypeByInt", () => {
    test("type is in RomuWorkoutType", () => {
      const result = cvRomuWorkoutTypeByInt(1)
      expect(result).toBe(1)
    })

    test("type is not in RomuWorkoutType", () => {
      const result = cvRomuWorkoutTypeByInt(7)
      expect(result).toBe(1)
    })
  })

  describe("cvRomuWorkoutPartNameByEnum", () => {
    test("part is in RomuWorkoutPart", () => {
      const result = cvRomuWorkoutPartNameByEnum(1)
      expect(result).toBe("胸")
    })
  })

  describe("cvRomuWorkoutTypeNameByEnum", () => {
    test("type is in RomuWorkoutType", () => {
      const result = cvRomuWorkoutTypeNameByEnum(1)
      expect(result).toBe("バーベル")
    })
  })
})
