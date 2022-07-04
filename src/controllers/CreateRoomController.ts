import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class CreateRoomController {
  async handle(request:Request, response:Response) {
    const { assunto } = request.body
    
    const admin_id = request.userId

    const room = await prismaClient.sala.create({
      data: { 
        assunto,
        inicio_em: new Date(),
        admin_id,

      }
    })

    return response.json(room);
  }
}