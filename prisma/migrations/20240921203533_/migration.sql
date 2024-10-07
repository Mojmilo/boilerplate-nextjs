/*
  Warnings:

  - The primary key for the `UserOnTeam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `workspaceId` on the `UserOnTeam` table. All the data in the column will be lost.
  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teamId` to the `UserOnTeam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserOnTeam" DROP CONSTRAINT "UserOnTeam_workspaceId_fkey";

-- AlterTable
ALTER TABLE "UserOnTeam" DROP CONSTRAINT "UserOnTeam_pkey",
DROP COLUMN "workspaceId",
ADD COLUMN     "teamId" TEXT NOT NULL,
ADD CONSTRAINT "UserOnTeam_pkey" PRIMARY KEY ("userId", "teamId");

-- DropTable
DROP TABLE "Workspace";

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserOnTeam" ADD CONSTRAINT "UserOnTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
