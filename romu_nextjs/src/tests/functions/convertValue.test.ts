import {
  cvObjectToQueryParamString,
  cvRomuWorkoutPartByInt,
  cvRomuWorkoutPartNameByEnum,
  cvRomuWorkoutTypeByInt,
  cvRomuWorkoutTypeNameByEnum,
} from "@/services/functions/convertValue"

describe("services/functions/convertValue", () => {
  describe("cvObjectToQueryParamString", () => {
    test("obj is string", () => {
      const result = cvObjectToQueryParamString({ key: "value" })
      expect(result).toBe("key=value")
    })

    test("obj is number", () => {
      const result = cvObjectToQueryParamString({ key: 1 })
      expect(result).toBe("key=1")
    })

    test("obj is boolean", () => {
      const result1 = cvObjectToQueryParamString({ key: true })
      expect(result1).toBe("key=1")

      const result2 = cvObjectToQueryParamString({ key: false })
      expect(result2).toBe("key=0")
    })

    test("obj is string, number, boolean", () => {
      const result = cvObjectToQueryParamString({
        key1: "value",
        key2: 1,
        key3: true,
      })
      expect(result).toBe("key1=value&key2=1&key3=1")
    })

    test("obj is string, number, boolean, null", () => {
      const result = cvObjectToQueryParamString({
        key1: "value",
        key2: 1,
        key3: true,
        key4: null,
      })
      expect(result).toBe("key1=value&key2=1&key3=1")
    })

    test("obj is string, number, boolean, null, undefined", () => {
      const result = cvObjectToQueryParamString({
        key1: "value",
        key2: 1,
        key3: true,
        key4: null,
        key5: undefined,
      })
      expect(result).toBe("key1=value&key2=1&key3=1")
    })
  })

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
