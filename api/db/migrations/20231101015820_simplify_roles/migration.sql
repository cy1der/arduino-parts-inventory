/*
  Warnings:

  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "UserRole_name_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserRole";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" DATETIME,
    "roles" TEXT NOT NULL DEFAULT 'user'
);
INSERT INTO "new_User" ("email", "firstName", "hashedPassword", "id", "lastName", "resetToken", "resetTokenExpiresAt", "salt") SELECT "email", "firstName", "hashedPassword", "id", "lastName", "resetToken", "resetTokenExpiresAt", "salt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
