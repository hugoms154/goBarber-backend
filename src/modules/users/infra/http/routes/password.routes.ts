import { Router } from 'express';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
