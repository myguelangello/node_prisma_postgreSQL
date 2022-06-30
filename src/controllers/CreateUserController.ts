import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class CreateUserController {
  async handle(request:Request, response:Response) {
    const { nome, email, senha } = request.body

    const user = await prismaClient.usuario.create({
      data: { 
        nome,
        email,
        senha,        
      }
    })

    return response.json(user);
  }
}