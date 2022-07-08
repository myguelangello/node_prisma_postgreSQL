import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteUserController {
  async handle(request:Request, response:Response) {
    const { id } = request.params
    
    const deleteUser = await prismaClient.usuario.delete({
      where: {
        id: Number(id)
      }
    })

    return response.json({message: 'the user was deleted'});
  }
}