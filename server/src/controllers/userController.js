const User = require("../model/userModel")
const bcrypt = require("bcrypt")

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        // check if username already used 
        const usernameCheck = await User.findOne({ username })
        if (usernameCheck) {
            return res.json({ msg: "Username already used", status: false })
        }
        //check if email already used
        const emailCheck = await User.findOne({ email })
        if (emailCheck) {
            return res.json({ msg: "Email already used", status: false })
        }
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10)
        //create the user in DB
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        })
        delete user.password
        return res.json({ status: true, user })
    } catch (error) {
        next(error)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        // check if username already used 
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({ msg: "Incorrect username or password", status: false })
        }
        //check valid password or not
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.json({ msg: "Incorrect username or password", status: false })
        }
        delete user.password
        return res.json({status:true,user})
    } catch (error) {
        next(error)
    }
}