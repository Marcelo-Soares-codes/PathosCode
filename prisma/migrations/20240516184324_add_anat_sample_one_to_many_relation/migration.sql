-- CreateTable
CREATE TABLE "Anat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "comments" TEXT,
    "executions" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Sample" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "envio" TEXT,
    "anatId" TEXT NOT NULL,
    CONSTRAINT "Sample_anatId_fkey" FOREIGN KEY ("anatId") REFERENCES "Anat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Anat_id_key" ON "Anat"("id");
