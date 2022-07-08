import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadUniqueRoomController {
  async handle(request:Request, response:Response) {

    const { codigo_sala } = request.params

    const room = await prismaClient.sala.findFirst({ 
      where: {
        codigo: Number(codigo_sala),
        admin_id: request.userId
      },
      select: {
        assunto: true,
        admin_id: true,
      },
      
    })

    return response.json(room);
  }
}

/* 
sala_usuarios: {
          include: {
            usuario: {
              select:{
                nome: true
              }
            }
          }
        }
*/