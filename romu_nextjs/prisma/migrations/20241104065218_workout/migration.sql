/*
  Warnings:

  - The primary key for the `TrainingSet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order` on the `TrainingSet` table. All the data in the column will be lost.
  - You are about to drop the column `trainingWorkoutId` on the `TrainingSet` table. All the data in the column will be lost.
  - The primary key for the `Workout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `trainingHeadId` to the `TrainingSet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TrainingSet" DROP CONSTRAINT "TrainingSet_userId_trainingWorkoutId_trainingOrder_fkey";

-- DropForeignKey
ALTER TABLE "TrainingWorkout" DROP CONSTRAINT "TrainingWorkout_workoutId_fkey";

-- AlterTable
ALTER TABLE "TrainingSet" DROP CONSTRAINT "TrainingSet_pkey",
DROP COLUMN "order",
DROP COLUMN "trainingWorkoutId",
ADD COLUMN     "setNo" SERIAL NOT NULL,
ADD COLUMN     "trainingHeadId" UUID NOT NULL,
ADD CONSTRAINT "TrainingSet_pkey" PRIMARY KEY ("userId", "trainingHeadId", "trainingOrder", "setNo");

-- AlterTable
ALTER TABLE "TrainingWorkout" ALTER COLUMN "workoutId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Workout_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "TrainingWorkout" ADD CONSTRAINT "TrainingWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSet" ADD CONSTRAINT "TrainingSet_userId_trainingHeadId_trainingOrder_fkey" FOREIGN KEY ("userId", "trainingHeadId", "trainingOrder") REFERENCES "TrainingWorkout"("userId", "trainingHeadId", "trainingOrder") ON DELETE RESTRICT ON UPDATE CASCADE;
