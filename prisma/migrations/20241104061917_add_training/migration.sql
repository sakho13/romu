-- CreateTable
CREATE TABLE "Workout" (
    "id" UUID NOT NULL,
    "type" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "createdBy" UUID,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingHead" (
    "userId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrainingHead_pkey" PRIMARY KEY ("userId","id")
);

-- CreateTable
CREATE TABLE "TrainingWorkout" (
    "userId" UUID NOT NULL,
    "trainingHeadId" UUID NOT NULL,
    "trainingOrder" INTEGER NOT NULL,
    "workoutId" UUID NOT NULL,
    "memo" TEXT NOT NULL,

    CONSTRAINT "TrainingWorkout_pkey" PRIMARY KEY ("userId","trainingHeadId","trainingOrder")
);

-- CreateTable
CREATE TABLE "TrainingSet" (
    "userId" UUID NOT NULL,
    "trainingWorkoutId" UUID NOT NULL,
    "trainingOrder" INTEGER NOT NULL,
    "order" SERIAL NOT NULL,
    "weight" DOUBLE PRECISION,
    "reps" INTEGER,
    "distance" DOUBLE PRECISION,
    "time" INTEGER,

    CONSTRAINT "TrainingSet_pkey" PRIMARY KEY ("userId","trainingWorkoutId")
);

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingHead" ADD CONSTRAINT "TrainingHead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingWorkout" ADD CONSTRAINT "TrainingWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingWorkout" ADD CONSTRAINT "TrainingWorkout_userId_trainingHeadId_fkey" FOREIGN KEY ("userId", "trainingHeadId") REFERENCES "TrainingHead"("userId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingWorkout" ADD CONSTRAINT "TrainingWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSet" ADD CONSTRAINT "TrainingSet_userId_trainingWorkoutId_trainingOrder_fkey" FOREIGN KEY ("userId", "trainingWorkoutId", "trainingOrder") REFERENCES "TrainingWorkout"("userId", "trainingHeadId", "trainingOrder") ON DELETE RESTRICT ON UPDATE CASCADE;
