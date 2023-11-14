/*
  Warnings:

  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('in', 'out');

-- AlterTable
ALTER TABLE "Part" ADD COLUMN     "transactionId" INTEGER;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "quantities" INTEGER[],
ADD COLUMN     "type" "TransactionType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
