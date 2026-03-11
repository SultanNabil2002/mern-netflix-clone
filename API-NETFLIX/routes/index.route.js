const router = require("express").Router()
const UserController = require("../controllers/index.controller")
const { checkToken } = require("../utils/auth")

router.get("/my-movies/:email/:token", checkToken, UserController.GetFavoriteMovies)
router.post("/my-movies", checkToken, UserController.AddFavoriteMovies)
router.delete("/my-movies", checkToken, UserController.RemoveFavoriteMovies)
router.post("/my-movies/check", checkToken, UserController.CheckFavoriteMovies)

// user sign-in token
router.post("/my-token", UserController.SignInToken)

// user sign-out token
router.delete("/my-token", checkToken, UserController.SignOutToken)

// sing up user endpoint
router.post("/sign-up", UserController.SignUpUser)

module.exports = router