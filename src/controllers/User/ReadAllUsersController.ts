import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadAllUsersController {
  async handle(request:Request, response:Response) {

    const allUsers = await prismaClient.usuario.findMany()

    return response.json(allUsers);
  }
}