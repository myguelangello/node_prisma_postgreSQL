import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateQuestionController {
  async handle(request: Request, response: Response) {
    // receber o room_id
    const { room_id } = request.params

    // receber o conteudo da pergunta
    const { question_content } = request.body

    // id do usuario que enviou a mensagem 
    const user_logged = request.userId

    // verificar se a sala existe
    const roomExists = await prismaClient.room.findUnique({
      where: { 
        room_id
      }
    })
    if (!roomExists) {
      return response.json({failed:"Oops, rooms not found"})
    }

    // verificar se a sala está aberta
    if(!(roomExists.room_closed_at === null)) {
      return response.json({failed: "Oops, this room aldeary closed by the creator"})
    }
    // verificar se o usuario logado é o admin da sala
    if(user_logged === roomExists.user_admin_id){
      return response.json({failed: "You are a creator and cannot submit questions. But take the opportunity to answer the questions received"})
    }

    // verificar se o usuário pertence à sala
    const userBelongsToRoom = await prismaClient.usersOnRooms.findUnique({
      where: {
        user_id_room_id: {
          user_id: user_logged,
          room_id: room_id
        }
      }
    });

    if (!(userBelongsToRoom)) {
      return response.json({failed: "User does not belong to the room"})
    }

    const createQuestion = await prismaClient.question.create({ 
      data: {
        question_content,
        room: {
          connect: {
            room_id
          }
        },
        user_author: {
          connect: {
            user_id: user_logged
          }
        }
      }
    })

    return response.json({message: "Question created successfully", createQuestion });
  }
}