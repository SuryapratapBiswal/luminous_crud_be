import LuminousUser from "../model/user.schema.js";

export const userRegister = async (req, res) => {
    try {
        const exist = await LuminousUser.findOne({ username: req.body.username });
        const existEmail = await LuminousUser.findOne({ email: req.body.email });

        if (exist) {
            return res.status(401).json({ message: "Username already exists" });
        }
        if (existEmail) {
            return res.status(401).json({ message: "User email already exists" });
        }
        const user = req.body;
        const newUser = new LuminousUser(user);
        await newUser.save();

        res.status(200).json({ resultObj: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
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