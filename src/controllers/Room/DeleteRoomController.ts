import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteRoomController {
  async handle(request:Request, response:Response) {
    const codigo =  request.params.codigo
    
    // verificar se o usuario é o admin da sala
    const admin_id = request.userId
    const userIsAdmin = await prismaClient.sala.findFirst({ 
      where: {
        admin_id
      }
    })
    if (!userIsAdmin) {
      return response.json({message: 'The user is not an admin of this room'})
    }

    // dletar a sala
    const deleteRoom = await prismaClient.sala.delete({
      where: {
        codigo: Number(codigo)
      }
    })

    return response.json({message: 'The room was deleted'});
  }
}