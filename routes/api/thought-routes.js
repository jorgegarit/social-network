//  will be getting the thought routes from the thought-controllers.js file
const router = require('express').Router();

// routes for thought get and post  /api/thoughts
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// roues for all thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// routes related to a single thought
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// routes for reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);   

module.exports = router;