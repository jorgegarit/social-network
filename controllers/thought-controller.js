const { Thought, User } = require('../models');

const thoughtController = {
    //  get request for all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(error => {
            console.log(error);
            res.status(400).json(error);
        });
    },

    // get one thought using the thoughtId
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found under this id' });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json(error);
        });
    },


}