import { RomuApiErrorUnit } from "./ApiTypes"

export interface RomuApiErrorInterface {
  httpStatus: number
  toErrorUnits(): RomuApiErrorUnit[]
}
