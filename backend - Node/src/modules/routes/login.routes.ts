import { Router } from "express";
import { LoginController } from "../login/loginController";
import { ResetPasswordController } from "../login/resetPassword/resetPasswordController";
import { ValidTokenController } from "../login/resetPassword/ValidTokenController";
import { ChangePasswordController } from './../login/resetPassword/ChangePasswordController';

const login = new LoginController();
const resetPassword = new ResetPasswordController()
const changePassword = new ChangePasswordController()
const validToken = new ValidTokenController()

const loginRoutes = Router();

loginRoutes.post('/', login.handle)
loginRoutes.patch('/reset', resetPassword.handle)
loginRoutes.patch('/reset/change', changePassword.handle)
loginRoutes.post('/reset/token', validToken.handle)


export { loginRoutes }