/*
  Warnings:

  - You are about to drop the column `quantities` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Part" DROP CONSTRAINT "Part_transactionId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "quantities";

-- CreateTable
CREATE TABLE "PartTransaction" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "partId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "PartTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PartTransaction" ADD CONSTRAINT "PartTransaction_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartTransaction" ADD CONSTRAINT "PartTransaction_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
