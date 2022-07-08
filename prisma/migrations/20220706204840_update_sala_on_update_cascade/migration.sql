-- DropForeignKey
ALTER TABLE "pergunta" DROP CONSTRAINT "fkey_sala_pergunta";

-- AddForeignKey
ALTER TABLE "pergunta" ADD CONSTRAINT "fkey_sala_pergunta" FOREIGN KEY ("sala_codigo") REFERENCES "sala"("codigo") ON DELETE NO ACTION ON UPDATE CASCADE;
