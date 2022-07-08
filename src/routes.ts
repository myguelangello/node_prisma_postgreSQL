import { Router } from 'express';

import { AuthMiddleware } from './middlewares/authMiddleware';

// user controller
import { AuthController } from './controllers/User/AuthController';
import { CreateUserController } from './controllers/User/CreateUserController';
import { DeleteUserController } from './controllers/User/DeleteUserController';
import { ReadAllUsersController } from './controllers/User/ReadAllUsersController';
import { UpdateUserController } from './controllers/User/UpdateUserController';

// room controller
import { CreateRoomController } from './controllers/Room/CreateRoomController';
import { DeleteRoomController } from './controllers/Room/DeleteRoomController';
import { EnterRoomController } from './controllers/Room/EnterRoomController';
import { ReadAllRoomsController } from './controllers/Room/ReadAllRoomsController';

//question controller
import { CreateQuestionController } from './controllers/Question/CreateQuestionController';
import { ReadUniqueRoomController } from './controllers/Room/ReadUniqueRoomController';

const router = Router();

// create user
const createUser = new CreateUserController();
router.post('/user', createUser.handle)

// authenticate user
const authUser = new AuthController();
router.post('/auth', authUser.authenticate)

// read unique user
const readUsers = new ReadAllUsersController();
router.get('/users', AuthMiddleware, readUsers.handle)

// update user
const updateUser = new UpdateUserController();
router.put('/user', AuthMiddleware, updateUser.handle)

// delete user
const deleteUser = new DeleteUserController();
router.delete('/user', deleteUser.handle)

// create room
const createRoom = new CreateRoomController();
router.post('/rooms/new', AuthMiddleware, createRoom.handle)

// enter room
const enterRoom = new EnterRoomController();
router.post('/room', AuthMiddleware, enterRoom.handle)

// read all rooms
const readRooms = new ReadAllRoomsController();
router.get('/rooms', AuthMiddleware, readRooms.handle)

// read unique room
const readUniqueRoom = new ReadUniqueRoomController();
router.get('/room/:codigo_sala', AuthMiddleware, readUniqueRoom.handle)

// delete room
const deleteRoom = new DeleteRoomController();
router.delete('/room/:codigo', AuthMiddleware, deleteRoom.handle)

//QUESTIONS
//create question
const createQuestion = new CreateQuestionController();
router.post('/question/:codigo_sala', AuthMiddleware, createQuestion.handle)

export { router }