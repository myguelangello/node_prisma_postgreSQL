import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class DeleteUserController {
  async handle(request:Request, response:Response) {
    const { id } = request.body
    const deleteUser = await prismaClient.usuario.delete({
      where: {
        id
      }
    })

    return response.json({message: 'Delete user'});
  }
}