//  will be getting the user routes from the user-controllers.js file
const router = require('express').Router();

// routes for user get and post  /api/users
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// get/post routes
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// routes for user by id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//  routes relating to friends
router
  .route('/:id/friends/:friendId')
  .post(addNewFriend)
  .delete(deleteFriend);

// exports user routes
module.exports = router;
