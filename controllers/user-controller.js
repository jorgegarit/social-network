const { User, Thought } = require('../models');

const userController = {
    //  get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(error => {
            console.log(error);
            res.status(400).json(error);
        });
    },

    // get a specific user by their id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found under this id' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json(error);
        });
    },

    // create a brand new user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(error => res.status(400).json(error));
    },

    // update a specific user by seraching with their id 
    updateUser({ params, body }, res) {
        //will need to run validators to assure that the specific id in question 
        // is the one being updated
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })  
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found under this id' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(error => res.status(400).json(error));
    },

    // delete a specific User by id 
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found under this id' });
            return;
            }
            // we have to make sure that we delete that specific users thoughts 
            // as well as the user itself
            return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        })
        .then(() => {
            res.json({ message: 'The user has been deleted' });
        })
        .catch(error => res.status(400).json(error));
    },

    // for adding friend the directory will be api/users/:userId/friends/:friendId
    // we will use this to make your the specific friend id is linked to that user id
    addNewFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params. friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found under this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(error => res.json(error));
    },

    // delete a friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params. friendId } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(error => res.json(error));
    }
};

module.exports = userController;
