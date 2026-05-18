-- CreateTable
CREATE TABLE "MasterFood" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseServingSize" DOUBLE PRECISION NOT NULL,
    "baseCalories" DOUBLE PRECISION NOT NULL,
    "baseProtein" DOUBLE PRECISION NOT NULL,
    "baseCarbs" DOUBLE PRECISION NOT NULL,
    "baseFat" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MasterFood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterExercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "youtubeLink" TEXT,

    CONSTRAINT "MasterExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "caloriesConsumed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "proteinConsumed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "carbsConsumed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fatConsumed" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "DailyLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodLog" (
    "id" TEXT NOT NULL,
    "dailyLogId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "grams" DOUBLE PRECISION NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FoodLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutLog" (
    "id" TEXT NOT NULL,
    "dailyLogId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WorkoutLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyLog_userId_date_key" ON "DailyLog"("userId", "date");

-- AddForeignKey
ALTER TABLE "FoodLog" ADD CONSTRAINT "FoodLog_dailyLogId_fkey" FOREIGN KEY ("dailyLogId") REFERENCES "DailyLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodLog" ADD CONSTRAINT "FoodLog_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "MasterFood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLog" ADD CONSTRAINT "WorkoutLog_dailyLogId_fkey" FOREIGN KEY ("dailyLogId") REFERENCES "DailyLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLog" ADD CONSTRAINT "WorkoutLog_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "MasterExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
