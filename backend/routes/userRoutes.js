import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser, getSingleUsers } from '../controller/userController.js'
import login from '../controller/authController.js'
import auth from '../middleware/auth.js';
import upload from '../config/multerconfig.js'
const userRouter = express.Router();


//Auth route
userRouter.post('/auth/login' , login);

//CRUD routes
userRouter.get('/list' , auth, getAllUsers);
userRouter.get('/list/:id' ,upload.single('f_Image') , auth, getSingleUsers);
userRouter.post('/create' ,upload.single('f_Image') ,auth , createUser);
userRouter.put('/edit/:id' , upload.single('f_Image') , auth , updateUser);
userRouter.delete('/delete/:id' , auth , deleteUser);


export default userRouter;