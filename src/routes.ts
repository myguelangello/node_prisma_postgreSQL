import { Router } from 'express';
import { CreateRoomController } from './controllers/CreateRoomController';

import { CreateUserController } from './controllers/CreateUserController';
import { DeleteUserController } from './controllers/DeleteUserController';
import { ReadAllUsersController } from './controllers/ReadAllUsersController';
import { UpdateUserController } from './controllers/UpdateUserController';

const router = Router();

// create unique user
const createUser = new CreateUserController();
router.post('/user', createUser.handle)

// read unique user
const readUsers = new ReadAllUsersController();
router.get('/users', readUsers.handle)

// update user
const updateUser = new UpdateUserController();
router.put('/user', updateUser.handle)

// delete user
const deleteUser = new DeleteUserController();
router.delete('/user', deleteUser.handle)

// create room
const createRoom = new CreateRoomController();
router.post('/room', createRoom.handle)


export { router }