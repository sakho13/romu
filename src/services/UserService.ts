import { PrismaClient } from "@prisma/client"

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
}
