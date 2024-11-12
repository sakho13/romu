import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const defaultWorkouts = {
  "bench-press": {
    name: "ベンチプレス",
    type: 1,
    part: 1,
  },
  squat: {
    name: "スクワット",
    type: 1,
    part: 5,
  },
  "dead-lift": {
    name: "デッドリフト",
    type: 1,
    part: 2,
  },
}

const transfer = async () => {
  return await prisma.$transaction(async (t) => {
    await t.workout.createMany({
      data: Object.entries(defaultWorkouts).map(([id, data]) => ({
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

  await transfer()

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
