import LuminousUser from "../model/user.schema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if username or email already exists
        const existingUser = await LuminousUser.findOne({ username });
        const existingEmail = await LuminousUser.findOne({ email });

        if (existingUser) {
            return res.status(401).json({ message: "Username already exists" });
        }
        if (existingEmail) {
            return res.status(401).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user with hashed password
        const newUser = new LuminousUser({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Respond without sending the password
        res.status(200).json({ 
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const userLogin = async (req, res) => {
    try {
        // Find the user by email
        const user = await LuminousUser.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare the password with hashed password in DB
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Respond with token and user information if needed
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,  // Add other fields as needed
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await LuminousUser.find({})
        res.status(200).json({ resultObj: users })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const removeUserById = async (req, res) => {
    try {
        const id = req.body.id;
        const result = await LuminousUser.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: `category deleted sucessfully with id : ${result._id}`, id: result._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserById = async (req, res) => {

    try {
        const id = req.body.id;
        const data = req.body;
        let result = await LuminousUser.findByIdAndUpdate(id, data, { new: true });
        console.log(result);
        res.status(200).json({ resultObj: result })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}