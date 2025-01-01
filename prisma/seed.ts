import { PrismaClient } from "@prisma/client"
import { initDataWorkouts } from "./initDatas/initDataWorkouts"
const prisma = new PrismaClient()

const transferWorkouts = async () => {
  return await prisma.$transaction(async (t) => {
    await t.workout.createMany({
      data: Object.entries(initDataWorkouts).map(([id, data]) => ({
        id,
        name: data.name,
        type: data.type,
        part: data.part,
        memo: "",
        isDefault: true,
      })),
      skipDuplicates: true,
    })
  })
}

// 定義されたデータを実際のモデルへ登録する処理
const main = async () => {
  console.log(`Start seeding ...`)

  await transferWorkouts()

  console.log(`Seeding finished.`)
}

// 処理開始
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
