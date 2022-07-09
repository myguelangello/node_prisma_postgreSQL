/*
  Warnings:

  - You are about to drop the column `user_birth_date` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rooms" ALTER COLUMN "room_closed_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_birth_date";
