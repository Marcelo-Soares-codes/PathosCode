/*
  Warnings:

  - You are about to drop the column `envio` on the `Sample` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sample" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "shipping" TEXT,
    "anatId" TEXT NOT NULL,
    CONSTRAINT "Sample_anatId_fkey" FOREIGN KEY ("anatId") REFERENCES "Anat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sample" ("anatId", "description", "id", "name") SELECT "anatId", "description", "id", "name" FROM "Sample";
DROP TABLE "Sample";
ALTER TABLE "new_Sample" RENAME TO "Sample";
CREATE TABLE "new_Anat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "comments" TEXT,
    "executions" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Anat" ("comments", "createdAt", "description", "executions", "id", "name", "updatedAt") SELECT "comments", "createdAt", "description", "executions", "id", "name", "updatedAt" FROM "Anat";
DROP TABLE "Anat";
ALTER TABLE "new_Anat" RENAME TO "Anat";
CREATE UNIQUE INDEX "Anat_id_key" ON "Anat"("id");
PRAGMA foreign_key_check("Sample");
PRAGMA foreign_key_check("Anat");
PRAGMA foreign_keys=ON;
