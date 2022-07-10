import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { prismaClient } from "../../database/prismaClient";

export class AuthController {
  async authenticate(request: Request, response: Response){
    const { user_email, user_password } = request.body;

    const user = await prismaClient.user.findUnique({ 
      where: { 
        user_email
      }
    })

    if (!user) {
      return response.json({ failed: "Incorrect email or passwords"})
    }

    const isValuePassword = await compare(user_password, user.user_password);

    if (!isValuePassword) {
      return response.json({ failed: "Ops... invalid password, try again."})
    }

    const token = sign(
      { 
        id: user.user_id
      }, 
      "f2f609dfa94ba08c606e63cf8c87fd05", 
      { 
        expiresIn: "1d"
      }
    )

    const { user_id } = user;

    return response.json({user: { user_id, user_email }, token});

 }
}