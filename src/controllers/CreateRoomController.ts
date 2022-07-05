import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class CreateRoomController {
  async handle(request:Request, response:Response) {
    const { assunto } = request.body
    
    const admin_id = request.userId

    let isRoom = true;

    while (isRoom) {
      /* gera o número da sala */
      const max = Math.floor(999999) 
      const min = Math.ceil(100000)

      let roomId = Math.floor(Math.random() * (max - min + 1) + min)

      // verificar se esse número já existe 
      const roomsExistIds = await prismaClient.sala.findFirst({ 
        where: { 
          codigo: roomId
        } 
      });

      if (!roomsExistIds) {
        isRoom = false;
        const room = await prismaClient.sala.create({
          data: { 
            assunto,
            inicio_em: new Date(),
            admin_id,
            codigo: roomId
          }
        })
        return response.status(201).json({ message: 'Room created successfully', room});        
      }

     // return response.json({failed: "ops, deu algum erro ao criar a sala, tente mais tarde"});
    }
  }
}