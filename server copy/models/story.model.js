import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    author: { type: String, required: true, minlength: 2 },
    synopsis: { type: String, required: true, minlength: 25 },
    storyText: { type: String, required: true, minlength: 50 },
    imageUrl: { type: String }
});

const Story = mongoose.model('Story', StorySchema);

export default Story;

