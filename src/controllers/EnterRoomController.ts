import { Request, Response } from "express";
import { prismaClient } from '../database/prismaClient';

export class EnterRoomController {
  async handle(request: Request, response: Response) {
    const { codigo } = request.body;
    const userId = request.userId

    // verificar se esse número já existe 
    if (!(await prismaClient.sala.findFirst({ where:{ codigo } }))) {
      return response.json({ message: "Ops, room not found" });
    }
    
    //verificar se o usuário não é o admin da própria sala
    if (await prismaClient.sala.findFirst({ where:{ admin_id: userId } })) {
      return response.json({ message: "Ops, user is the room creator!" });
    }
    
    //verificar se o usuário já pertence a sala
    if (await prismaClient.sala_usuarios.findFirst({ where:{ usuario_id: userId } })) {
      return response.json({ message: "Ops, user already belongs to the room!" });
    }

    const user = await prismaClient.sala_usuarios.create({ 
      data: { 
        sala_codigo: codigo, 
        usuario_id: userId
      }
    })

    return response.json({ message: "User entered the room"})
  }
}