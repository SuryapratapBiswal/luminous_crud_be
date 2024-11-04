import express from "express";

import {
    userRegister,
    getAllUsers,
    removeUserById,
    updateUserById,
    userLogin
} from "../contoller/user-contoller.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/getusers", getAllUsers);
router.post("/getusers/remove", removeUserById);
router.put("/getusers/update", updateUserById);

export default router;