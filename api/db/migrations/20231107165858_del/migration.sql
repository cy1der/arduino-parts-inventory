/*
  Warnings:

  - You are about to drop the `PartTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PartTransaction" DROP CONSTRAINT "PartTransaction_partId_fkey";

-- DropForeignKey
ALTER TABLE "PartTransaction" DROP CONSTRAINT "PartTransaction_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropTable
DROP TABLE "PartTransaction";

-- DropTable
DROP TABLE "Transaction";

-- DropEnum
DROP TYPE "TransactionType";
