import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class UpdateUserController {
  async handle(request:Request, response:Response) {
    const { id, nome, email, senha } = request.body

    const updateUser = await prismaClient.usuario.update({
      where: {
        id
      },
      data: {
        nome,
        email,
        senha,
      },
    })

    return response.json(updateUser);
  }
}