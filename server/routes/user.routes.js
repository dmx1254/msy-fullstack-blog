const router = require("express").Router();
const authControllers = require("../controllers/auth");

router.post("/register", authControllers.signUp);
router.post("/login", authControllers.signIn);
router.get('/logout', authControllers.logout);
router.get('/', authControllers.getAllUsers);
router.get('/:id', authControllers.getOneUser);
router.put('/:id', authControllers.updateUser);
router.delete('/:id', authControllers.deleteUser);

module.exports = router;
