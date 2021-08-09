const express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser, createUser } = require('../controllers/userController');

const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/logout", logout);

// router.post("/forgotPassword", forgotPassword);
// router.post("/resetPassword/:token", resetPassword);

// router.use(protect);

// router.patch("/updateMyPassword", updatePassword);
// router.get("/me", getMe, getUser);
// router.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);
// router.delete("/deleteMe", deleteMe);

//! Routes only for admin
// router.use(restrictTo("admin"));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
