import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadUserController {
  async handle(request:Request, response:Response) {
    const user_logged = request.userId

    if (!user_logged) {
      console.info("não tá logado")
      return response.json("não tá logado")
    }

    const user = await prismaClient.user.findUnique({
      where: {
        user_id: user_logged
      }
    })

    return response.json(user);
  }
}