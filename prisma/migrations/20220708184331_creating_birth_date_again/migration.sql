/*
  Warnings:

  - Added the required column `user_birth_date` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_birth_date" DATE NOT NULL;
