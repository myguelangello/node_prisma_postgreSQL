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

const createUser = new CreateUserController();
const authUser = new AuthController();
const readUsers = new ReadAllUsersController();
const updateUser = new UpdateUserController();
const deleteUser = new DeleteUserController();
const createRoom = new CreateRoomController();
const enterRoom = new EnterRoomController();
const readRooms = new ReadAllRoomsController();
const readUniqueRoom = new ReadUniqueRoomController();
const deleteRoom = new DeleteRoomController();
const createQuestion = new CreateQuestionController();

// create user
router.post('/user', createUser.handle)

// authenticate user
router.post('/auth', authUser.authenticate)

// read unique user
router.get('/users', AuthMiddleware, readUsers.handle)

// update user
router.put('/user/:user_id', AuthMiddleware, updateUser.handle)

// delete user
router.delete('/user', deleteUser.handle)

// create room
router.post('/rooms/new', AuthMiddleware, createRoom.handle)

// enter room
router.post('/room/:room_id', AuthMiddleware, enterRoom.handle)

// read all rooms
router.get('/rooms', AuthMiddleware, readRooms.handle)

// read unique room
router.get('/room/:codigo_sala', AuthMiddleware, readUniqueRoom.handle)

// delete room
router.delete('/room/:codigo', AuthMiddleware, deleteRoom.handle)

//create question
router.post('/question/:room_id', AuthMiddleware, createQuestion.handle)

export { router }