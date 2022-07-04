import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { prismaClient } from "../database/prismaClient";

export class AuthController {
  async authenticate(request: Request, response: Response){
    const { email, senha } = request.body;

    const user = await prismaClient.usuario.findUnique({where: { email}})

    if (!user) {
      return response.json({ error: "User not found"})
    }

    const isValuePassword = await compare(senha, user.senha);

    if (!isValuePassword) {
      return response.json({ error: "Invalid password"})
    }

    const token = sign(
      { 
        id: user.id
      }, 
      "f2f609dfa94ba08c606e63cf8c87fd05", 
      { 
        expiresIn: "1d"
      }
    )

    const { id } = user;

    return response.json({user: { id, email }, token});

 }
}