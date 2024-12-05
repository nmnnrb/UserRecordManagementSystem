import express from 'express';

import loginAdmin from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post('/login' , loginAdmin)

export default authRouter;