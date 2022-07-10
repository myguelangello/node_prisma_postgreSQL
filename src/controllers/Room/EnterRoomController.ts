import { Request, Response } from "express";
import { prismaClient } from '../../database/prismaClient';

type UsersOnRooms = {
  user_logged: number
}

export class EnterRoomController {
  async handle(request: Request, response: Response) {
    const { access_code } = request.body;
    const room_id = access_code;
    const user_logged = Number(request.userId)


    const roomExists = await prismaClient.room.findUnique({ where:{ room_id } })

    // verificar se esse número já existe 
    if (!roomExists) {
      return response.json({ failed: "Oops, invalid room code" });
    }

    // verificar se o usuário é admin (não preisa entrar nela)
    if(roomExists.user_admin_id === user_logged) {
      return response.json({ failed: "Ops, user is the room creator!" });
    }
    
    const userAlreadyBelongsToRoom = await prismaClient.usersOnRooms.findUnique({ 
      where: { 
        user_id_room_id: { // precisa passar user_id e room_id pois é uma PK composta
          user_id: user_logged, 
          room_id 
        }
      } 
    }) 

    if (userAlreadyBelongsToRoom) {
      return response.json({ failed: "User already belongs to room!" });
    }

    const usersOnRooms = await prismaClient.usersOnRooms.create({
      data: {
        room: {
          connect: {
            room_id
          }
        }, 
        user: {
          connect: {
            user_id: user_logged
          }
        }
      }
    })

    return response.json({message: "User entered the room"})
  }
}