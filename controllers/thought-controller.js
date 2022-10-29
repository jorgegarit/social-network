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
        Thought.findOne({ _id: params.thoughtId })
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

    // create a new thought that will be paired with user id 
    addThought({ params, body }, res) {
        Thought.create(body)
        .then(dbThoughtData => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: dbThoughtData._id } },
              { new: true }
            );
          })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found under this id' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(error => res.json(error));
    },

    //   update a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch(error => res.status(400).json(error));
    },

    // delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtid })
        .then(erasedThought => {
            if (!erasedThought) {
            res.status(404).json({ message: 'Could not find a thought' });
            }
            return User.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(() => {
            res.json({ message: 'The thought has been deleted' });
        })
        .catch(error => res.status(400).json(error));
    },

    // create a new reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
       .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(error => res.json(error));
    },

    //  remove a reaction using the reaction id
    removeReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(error => res.json(error));
    }
};

module.exports = thoughtController;