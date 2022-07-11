import { Router } from 'express';

import { AuthMiddleware } from './middlewares/authMiddleware';

// user controller
import { AuthController } from './controllers/User/AuthController';
import { CreateUserController } from './controllers/User/CreateUserController';
import { DeleteUserController } from './controllers/User/DeleteUserController';
import { UpdateUserController } from './controllers/User/UpdateUserController';

// room controller
import { CreateRoomController } from './controllers/Room/CreateRoomController';
import { DeleteRoomController } from './controllers/Room/DeleteRoomController';
import { EnterRoomController } from './controllers/Room/EnterRoomController';
import { ReadAllRoomsController } from './controllers/Room/ReadAllRoomsController';

//question controller
import { CreateQuestionController } from './controllers/Question/CreateQuestionController';
import { ListQuestionsController } from './controllers/Question/ListQuestionsController';

//answer controller
import { CreateAnswerController } from './controllers/Answer/CreateAnswerController';
import { ReadUserController } from './controllers/User/ReadUserController';

const router = Router();

const createUser = new CreateUserController();
const authUser = new AuthController();
const readUser = new ReadUserController();
const updateUser = new UpdateUserController();
const deleteUser = new DeleteUserController();
const createRoom = new CreateRoomController();
const enterRoom = new EnterRoomController();
const readRooms = new ReadAllRoomsController();
const readUniqueRoom = new ListQuestionsController();
const deleteRoom = new DeleteRoomController();
const createQuestion = new CreateQuestionController();
const createAnswer = new CreateAnswerController();

// create user
router.post('/user', createUser.handle)

// authenticate user
router.post('/auth', authUser.authenticate)

// read user
router.get('/user_unique', AuthMiddleware, readUser.handle)

// update user
router.put('/user/:user_id', AuthMiddleware, updateUser.handle)

// delete user
router.delete('/user', deleteUser.handle)

// create room
router.post('/rooms/new', AuthMiddleware, createRoom.handle)

// enter room
router.post('/rooms', AuthMiddleware, enterRoom.handle)

// read all rooms
router.get('/rooms', AuthMiddleware, readRooms.handle)

// list questions in room
router.get('/room/:room_id', AuthMiddleware, readUniqueRoom.handle)

// delete room
router.delete('/room/:codigo', AuthMiddleware, deleteRoom.handle)

//create question
router.post('/question/:room_id', AuthMiddleware, createQuestion.handle)

//create answer
router.post('/:room_id/:question_id', AuthMiddleware, createAnswer.handle)

export { router }