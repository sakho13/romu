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

  /**
   * ワークアウトを取得する
   * @param db
   * @param firebaseUid FirebaseのUID
   * @param workoutId
   * @returns
   */
  public static async getWorkout(
    db: PrismaClient,
    firebaseUid: string,
    workoutId: string,
  ) {
    return await db.workout.findUnique({
      where: {
        id: workoutId,
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

  /**
   * カスタムワークアウトを作成する
   * @param db
   * @param firebaseUid FirebaseのUID
   * @param workout ワークアウト情報
   * @returns
   */
  public static async createCustomWorkout(
    db: PrismaClient,
    firebaseUid: string,
    workout: {
      name: string
      memo: string
      type: number
      part: number
    },
  ) {
    return await db.workout.create({
      data: {
        name: workout.name,
        memo: workout.memo,
        type: workout.type,
        part: workout.part,
        isDefault: false,
        user: {
          connect: {
            firebaseUid,
          },
        },
      },
      select: { id: true },
    })
  }
}
