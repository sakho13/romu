import { PrismaClient } from "@prisma/client"

export class WorkoutsService {
  /**
   * ユーザが読み取り可能なワークアウトを取得する
   * @param db
   * @param firebaseUid firebaseのUID
   * @returns
   */
  public static async getWorkouts(db: PrismaClient, firebaseUid: string) {
    return await db.workout.findMany({
      select: {
        id: true,
        name: true,
        memo: true,
        type: true,
        part: true,
        isDefault: true,
      },
      where: {
        OR: [
          {
            isDefault: true,
          },
          {
            user: {
              firebaseUid,
            },
          },
        ],
      },
    })
  }
}