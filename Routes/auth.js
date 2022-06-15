const router = require("express").Router();
const User = require("../Models/User");
const { RegisterValidation, LoginValidation } = require("../validaition");
const bcrybt = require("bcryptjs");

router.post("/register", async(req, res) => {
    //VALIDATE USER DATA BEFOR GENERATE
    try {
        const { error } = RegisterValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    } catch (error) {
        res.send(error);
    }

    //CHECKING THE USER IF IN DATABASE
    const emailExisted = await User.findOne({
        email: req.body.email,
    });
    if (emailExisted) return res.status(400).send("Email already existed");

    //HASH THE PASSWORD

    const salt = await bcrybt.genSalt(10);
    const hashPassword = await bcrybt.hash(req.body.password, salt);
    //CREATE NEW USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        account_status: req.body.account_status,
        password: hashPassword,
    });
    try {
        const savedUser = await user.save();
        res.send({
            userId: savedUser._id,
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/login", async(req, res) => {
    //VALIDATE USER DATA BEFOR GENERATE

    try {
        const { error } = LoginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    } catch (error) {
        res.send(error);
    }


    //CHECKING THE USER IF IN DATABASE
    const emailExisted = await User.findOne({
        email: req.body.email,
    });
    if (!emailExisted) return res.status(400).send("Email or password is wrong !!!");

    try {
        //CHECK THE PASSWORD IF CORRECT

        const valiedpass = await bcrybt.compare(req.body.password, emailExisted.password);
        if (!valiedpass) return res.status(400).send("Invalid Password");

        res.send("login success");
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;