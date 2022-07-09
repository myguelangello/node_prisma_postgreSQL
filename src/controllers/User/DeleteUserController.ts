import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteUserController {
  async handle(request:Request, response:Response) {
    const { id } = request.params
    
    const deleteUser = await prismaClient.user.delete({
      where: {
        user_id: Number(id)
      }
    })

    return response.json({message: 'Your account has been successfully deleted'});
  }
}