const User = require("../models/user.model");

const registerUser = async (req, res) => {

    console.log(req.body);

    try {

        const { firstName, lastName, email, password } = req.body;

        const user = await User.create({
            firstName,
            lastName,
            email,
            password
        });

        res.status(201).json(user);

    } catch (error) {

        console.log(error);

        res.status(500).json(error);

    }

};

module.exports = { registerUser };