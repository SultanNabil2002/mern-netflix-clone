const { User } = require("../models/index.model")
const { ERR } = require("./response")

const checkToken = async (req, res, next) => {
    const email = req.params?.email || req.body?.email
    const token = req.params?.token || req.body?.token

    if (!email || !token) {
        return ERR(res, 400, "Error, No Data Provided")
    }

    try {
        const user = await User.findOne({ email, token })
        if (!user) {
            return ERR(res, 401, "Error, Unauthorized")
        }
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        return ERR(res, 500, "Error, cant check token!")
    }
}

module.exports = { checkToken }