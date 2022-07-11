import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadAllRoomsController {
  async handle(request:Request, response:Response) {

    const allRooms = await prismaClient.room.findMany({})

    return response.json(allRooms);
  }
}
