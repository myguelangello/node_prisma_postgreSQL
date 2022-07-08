import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateQuestionController {
  async handle(request: Request, response: Response) {
    // receber o cod da sala
    const { codigo_sala } = request.params

    // receber o conteudo da pergunta
    const { texto } = request.body

    // id do usuario que enviou a mensagem 
    const userId = request.userId

    const verify = await prismaClient.sala_usuarios.findFirst({
      where: {
        sala_codigo: Number(codigo_sala),
        usuario_id: userId
      }
    })

   try {
      const pergunta = await prismaClient.pergunta.create({
      data:{
        texto,
        usuario_id: userId,
        sala_codigo: Number(codigo_sala)
      }
    })
    return response.json(pergunta)
  } catch (error) {
    console.log(error)
    return response.json(error)
     
   }
  }
}