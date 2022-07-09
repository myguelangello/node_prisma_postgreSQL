import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateRoomController {
  async handle(request:Request, response:Response) {
    const { room_title } = request.body
    
    const admin_id = request.userId

    const createRoom = await prismaClient.room.create({
      data: { 
        room_title,
        room_created_at: new Date(),
        user_admin:{ 
          connect: {
            user_id: admin_id
          }
        }
      }
    })

    return response.json(createRoom)
 }
}