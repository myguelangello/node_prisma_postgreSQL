import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateUserController {
  async handle(request:Request, response:Response) {
    const { user_name, user_password, user_email} = request.body

    
    const userExists = await prismaClient.user.findUnique({where: { user_email}})

    if (userExists) {
      return response.json({ failded: "User already exists"})
    }

    const hash_password = await hash(user_password, 8)

    const user = await prismaClient.user.create({
      data: {
        user_name,
        user_email,
        user_password: hash_password,
      }
    })

    return response.status(201).json({user: {user_name, user_email}});
  }
}