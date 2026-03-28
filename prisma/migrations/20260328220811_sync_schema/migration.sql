/*
  Warnings:

  - Added the required column `owner_id` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'ongoing';

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'provider';

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "owner_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
