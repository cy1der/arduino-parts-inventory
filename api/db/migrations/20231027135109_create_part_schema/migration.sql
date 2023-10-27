-- CreateTable
CREATE TABLE "Part" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT DEFAULT 'No description provided',
    "availableStock" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT NOT NULL DEFAULT '/no_image.png',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
