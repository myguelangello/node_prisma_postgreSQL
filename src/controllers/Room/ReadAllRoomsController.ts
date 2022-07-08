import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadAllRoomsController {
  async handle(request:Request, response:Response) {

    const allRooms = await prismaClient.sala_usuarios.findMany({ 
      select: {
        sala: {
          include: {
            usuario: {
              select: {
                nome: true,
              }
            }
          }
        }
      }
    })

    return response.json(allRooms);
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