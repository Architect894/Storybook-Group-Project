import { findAllStories, findOneStory, createStory, updateStory, deleteStory } from '../controllers/story.controller.js';
import { Router } from "express"

const storyRouter = Router()

// export default function(app) {
//     app.get('/api/findAllStories', findAllStories);
//     app.get('/api/findOneStory/:id', findOneStory);
//     app.post('/api/createStory', createStory);
//     app.put('/api/updateStory/:id', updateStory);
//     app.delete('/api/deleteStory/:id', deleteStory);
// }

storyRouter.route('/api/createStory')
    .post(createStory)

storyRouter.route('/api/findAllStories')
    .get(findAllStories)

storyRouter.route('/api/findOneStory/:id')
    .get(findOneStory)

storyRouter.route('/api/updateStory/:id')
    .put(updateStory)

storyRouter.route('/api/deleteStory/:id')
    .delete(deleteStory)


export default storyRouter