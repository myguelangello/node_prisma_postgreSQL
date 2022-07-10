import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ListQuestionsController {
  async handle(request:Request, response:Response) {

    const { room_id } = request.params
    const user_logged = request.userId

    // verificar se o usuário logado é o admin da sala que quer listar
    const roomExists = await prismaClient.room.findUnique({ 
      where: {
        room_id
      }
     })
     if (!roomExists) {
       return response.json({ failed: "Oops, room not found." });
     }

     if (!(user_logged === roomExists.user_admin_id)) {
       return response.json({failed: "Access Denied"})
     }

     const room = await prismaClient.room.findUnique({
       where: {
         room_id,
       }, 
       include: {
         questions: true
       }
     })


    return response.json(room);
  }
}
