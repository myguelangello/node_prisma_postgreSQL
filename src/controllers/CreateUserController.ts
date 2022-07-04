import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class CreateUserController {
  async handle(request:Request, response:Response) {
    const { nome, email, senha } = request.body

    const userExists = await prismaClient.usuario.findUnique({where: { email}})

    if (userExists) {
      return response.json({ error: "User already exists"})
    }

    const hash_password = await hash(senha, 8)

    const user = await prismaClient.usuario.create({
      data: { 
        nome,
        email,
        senha: hash_password,        
      }
    })

    return response.json(user);
  }
}