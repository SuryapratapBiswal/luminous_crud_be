import express from "express";

import {
    userRegister,
    getAllUsers,
    removeUserById,
    updateUserById
} from "../contoller/user-contoller.js";

const router = express.Router();

router.post("/register", userRegister);
router.get("/getusers", getAllUsers);
router.post("/getusers/remove", removeUserById);
router.put("/getusers/update", updateUserById);

export default router;