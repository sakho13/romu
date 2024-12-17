import { PrismaClient } from "@prisma/client"
import { RomuApiError } from "./classes/RomuApiError"

export class UserService {
  /**
   * firebaseUidからユーザーを取得する
   * 存在しない場合は作成する
   * @param db
   * @param firebaseUid FirebaseのUID
   * @param data
   * @returns
   */
  public static async getUserByFirebaseUid(
    db: PrismaClient,
    firebaseUid: string,
    data: {
      email: string
      name: string
    },
  ) {
    const exist = await db.user.findUnique({
      where: {
        firebaseUid,
      },
    })

    if (exist) return exist

    const created = await db.user.create({
      data: {
        firebaseUid,
        email: data.email,
        name: data.name,
      },
    })
    return created
  }

  public static async updateUserByFirebaseUid(
    db: PrismaClient,
    firebaseUid: string,
    userData: Partial<{ name: string }>,
  ) {
    if (Object.keys(userData).length === 0)
      throw new RomuApiError({
        errorCode: "NoPermission",
        param: { userId: firebaseUid },
      })
    return await db.user.update({
      data: { name: userData.name },
      where: { firebaseUid },
    })
  }

  public static async getUserByFirebaseUidAdminRole(
    db: PrismaClient,
    firebaseUid: string,
  ) {
    return await db.user.findUnique({
      where: {
        firebaseUid,
        role: 1,
      },
    })
  }

  public static async updateUserStatusAndDeleteAtByFirebaseUid(
    db: PrismaClient,
    firebaseUid: string,
  ) {
    return await db.user.update({
      where: { firebaseUid },
      data: {
        status: 9,
        deletedAt: new Date(),
      },
    })
  }
}
