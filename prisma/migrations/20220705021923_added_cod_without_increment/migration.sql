-- CreateTable
CREATE TABLE "admin" (
    "usuario_id" SERIAL NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "pergunta" (
    "id" SERIAL NOT NULL,
    "texto" VARCHAR NOT NULL,
    "usuario_id" SERIAL NOT NULL,
    "sala_codigo" SERIAL NOT NULL,

    CONSTRAINT "pergunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resposta" (
    "id" SERIAL NOT NULL,
    "texto" VARCHAR NOT NULL,
    "pergunta_id" SERIAL NOT NULL,
    "admin_id" SERIAL NOT NULL,

    CONSTRAINT "resposta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sala" (
    "codigo" INTEGER NOT NULL,
    "assunto" VARCHAR NOT NULL,
    "inicio_em" TIMESTAMP(6) NOT NULL,
    "fim_em" TIMESTAMP(6),
    "status" BOOLEAN DEFAULT true,
    "admin_id" SERIAL NOT NULL,

    CONSTRAINT "sala_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "sala_usuarios" (
    "sala_codigo" SERIAL NOT NULL,
    "usuario_id" SERIAL NOT NULL,

    CONSTRAINT "sala_usuarios_pkey" PRIMARY KEY ("sala_codigo","usuario_id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "senha" VARCHAR NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ukey_usuario_email" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "fkey_usuario_admin" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pergunta" ADD CONSTRAINT "fkey_sala_pergunta" FOREIGN KEY ("sala_codigo") REFERENCES "sala"("codigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pergunta" ADD CONSTRAINT "fkey_usuario_pergunta" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resposta" ADD CONSTRAINT "fkey_admin_resposta" FOREIGN KEY ("admin_id") REFERENCES "admin"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resposta" ADD CONSTRAINT "fkey_pergunta_resposta" FOREIGN KEY ("pergunta_id") REFERENCES "pergunta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sala" ADD CONSTRAINT "fkey_admin_sala" FOREIGN KEY ("admin_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sala_usuarios" ADD CONSTRAINT "fkey_sala_sala_usuario" FOREIGN KEY ("sala_codigo") REFERENCES "sala"("codigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sala_usuarios" ADD CONSTRAINT "fkey_usuario_sala_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
