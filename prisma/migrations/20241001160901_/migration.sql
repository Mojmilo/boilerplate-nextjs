/*
  Warnings:

  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "stripeCustomerId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeCustomerId";
