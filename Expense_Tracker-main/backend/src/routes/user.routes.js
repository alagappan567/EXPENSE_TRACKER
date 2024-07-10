const express = require("express");
const multer = require("multer");

const UpdateUserController = require("../contoller/UserController/UpdateUser.controller");
const CreateUesrController = require("../contoller/UserController/Register.controller");

const DeleteUserController = require("../contoller/UserController/DeleteUser.controller");
const tokenVerifier = require("../middleware/tokenVerifiers.middleware");
const UserProfileController = require("../contoller/UserController/UserProfile.controller");
const UserFetchByTokenController = require("../contoller/UserController/UserFetchByToken.controller");
const UserFetchBalanceController = require("../contoller/UserController/UserFetchBalance.controller");

const userRoutes = express();

userRoutes.post("/", CreateUesrController);
userRoutes.patch("/", tokenVerifier, UpdateUserController);
userRoutes.delete("/", tokenVerifier, DeleteUserController);
userRoutes.get("/fetch-by-id", tokenVerifier, UserProfileController);
userRoutes.get("/fetch-by-token", tokenVerifier, UserFetchByTokenController);
userRoutes.get("/user-balance", tokenVerifier, UserFetchBalanceController);

module.exports = userRoutes;
