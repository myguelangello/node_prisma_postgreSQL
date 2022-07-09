/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pergunta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `resposta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sala` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sala_usuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "fkey_usuario_admin";

-- DropForeignKey
ALTER TABLE "pergunta" DROP CONSTRAINT "fkey_sala_pergunta";

-- DropForeignKey
ALTER TABLE "pergunta" DROP CONSTRAINT "fkey_usuario_pergunta";

-- DropForeignKey
ALTER TABLE "resposta" DROP CONSTRAINT "fkey_admin_resposta";

-- DropForeignKey
ALTER TABLE "resposta" DROP CONSTRAINT "fkey_pergunta_resposta";

-- DropForeignKey
ALTER TABLE "sala" DROP CONSTRAINT "fkey_admin_sala";

-- DropForeignKey
ALTER TABLE "sala_usuarios" DROP CONSTRAINT "fkey_sala_sala_usuario";

-- DropForeignKey
ALTER TABLE "sala_usuarios" DROP CONSTRAINT "fkey_usuario_sala_usuario";

-- DropTable
DROP TABLE "admin";

-- DropTable
DROP TABLE "pergunta";

-- DropTable
DROP TABLE "resposta";

-- DropTable
DROP TABLE "sala";

-- DropTable
DROP TABLE "sala_usuarios";

-- DropTable
DROP TABLE "usuario";

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_birth_date" DATE NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "room_id" TEXT NOT NULL,
    "room_title" VARCHAR NOT NULL,
    "room_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "room_closed_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_admin_id" INTEGER NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "users_on_rooms" (
    "user_id" INTEGER NOT NULL,
    "room_id" TEXT NOT NULL,

    CONSTRAINT "users_on_rooms_pkey" PRIMARY KEY ("user_id","room_id")
);

-- CreateTable
CREATE TABLE "questions" (
    "question_id" SERIAL NOT NULL,
    "question_content" VARCHAR NOT NULL,
    "question_room_id" TEXT NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "answers" (
    "answer_id" SERIAL NOT NULL,
    "answer_content" VARCHAR NOT NULL,
    "answer_question_id" INTEGER NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("answer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_user_admin_id_fkey" FOREIGN KEY ("user_admin_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_rooms" ADD CONSTRAINT "users_on_rooms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_rooms" ADD CONSTRAINT "users_on_rooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_question_room_id_fkey" FOREIGN KEY ("question_room_id") REFERENCES "rooms"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_answer_question_id_fkey" FOREIGN KEY ("answer_question_id") REFERENCES "questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;
