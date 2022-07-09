import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateUserController {
  async handle(request:Request, response:Response) {
    const {user_name, user_email, user_password } = request.body
    
    const user_id = Number(request.params.user_id)

    const user_logged = request.userId

    if (!user_logged) {
      return response.redirect('/auth')
    }

    if (!(await prismaClient.user.findUnique({ where: { user_id } }) )) {
      return response.json({ failed: "User not found"})
    }

    if (!(user_logged === user_id)) {
      return response.json({ message: "Ops, your not permission to update this user"})
    }

    const updateUser = await prismaClient.user.update({
      where: {
        user_id: Number(user_id),
      },
      data: {
        user_name,
        user_email,
        user_password,
      },
    })

    return response.json(updateUser);
  }
}