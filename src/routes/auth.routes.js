import express from 'express';
import { getRegisterController,postRegisterController } from '../controllers/auth.controller.js';

const router = express.Router();

router.route("/register").get(getRegisterController).post(postRegisterController);

export default router;