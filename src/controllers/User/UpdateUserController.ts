import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateUserController {
  async handle(request:Request, response:Response) {
    const { user_name, user_email, user_current_password, user_new_password } = request.body
    const user_id = Number(request.params.user_id)
    const user_logged = request.userId
    
    // verificando se o usuário está logado
    if (!user_logged) {
      return response.redirect('/auth')
    }
    
    if (!(user_logged === user_id)) {
      return response.json({ failed: "Ops, your not permission to update this user"})
    }

    // verificando se os campos necessários estão sendo passados
    if (user_name === undefined) {
      return response.json({ failed: "Fill in the name field"})
    }
    if (user_email === undefined) {
      return response.json({ failed: "Fill in the email field"})
    }
    if (user_current_password === undefined || user_new_password === undefined) {
      return response.json({ failed: "Fill in the password fields"})
    }
    
    const user = await prismaClient.user.findUnique({ where: { user_id } })

    if (!user) {
      return response.json({ failed: "User not found"})
    }
       
    if(!(user.user_password === user_current_password)){
      return response.json({ failed: "Your current password is incorrect"})
    }

    if (user_current_password === user_new_password) {
      return response.json({ failed: "Current password and new password cannot be the same"})
    }

    const hash_password = await hash(user_new_password, 8)

    const updateUser = await prismaClient.user.update({
      where: {
        user_id: Number(user_id),
      },
      data: {
        user_name: user_name,
        user_password: hash_password,
        user_email: user_email
      
      },
    })

    return response.json({message: "User data successfully updated",updateUser: { user_email, user_name } });
  }
}