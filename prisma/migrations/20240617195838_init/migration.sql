-- CreateTable
CREATE TABLE "SecretNote" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SecretNote_pkey" PRIMARY KEY ("id")
);
