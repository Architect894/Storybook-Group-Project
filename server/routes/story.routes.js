import { findAllStories, findOneStory, createStory, updateStory, deleteStory } from '../controllers/story.controller.js';
import { Router } from "express"

const storyRouter = Router()

storyRouter.route('/createStory')
    .post(createStory)

storyRouter.route('/findAllStories')
    .get(findAllStories)

storyRouter.route('/findOneStory/:id')
    .get(findOneStory)

storyRouter.route('/updateStory/:id')
    .put(updateStory)

storyRouter.route('/deleteStory/:id')
    .delete(deleteStory)


export default storyRouter