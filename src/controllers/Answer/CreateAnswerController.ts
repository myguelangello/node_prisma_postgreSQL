import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateAnswerController {
  async handle(request: Request, response: Response) {
    const { room_id, question_id } = request.params
    const { answer_content } = request.body
    const user_logged = request.userId
    
    if (!user_logged) {
      return response.json({failed:"User not logged"})
    }

    if (!answer_content) {
      return response.json({failed:"Fill in answer field for send a answer"})
    }

    const roomExists = await prismaClient.room.findUnique({
      where: {room_id}
    })
    if (!roomExists) {
      return response.json({failed:"Oops, room not found"})
    }
    if(!(roomExists.room_closed_at === null)){
      return response.json({failed: "Oops, this room aldeary closed by the creator"})
    }

    if(!(user_logged === roomExists.user_admin_id)){
      console.log(user_logged, roomExists.user_admin_id)
      return response.json({failed: "You not permitted to send answer in this room"})

    }

    const createAnswer = await prismaClient.answer.create({
      data: {
        answer_content,
        question: {
          connect: {
            question_id: Number(question_id)
          }
        }
      }
    })

    return response.json(createAnswer)
  }
}