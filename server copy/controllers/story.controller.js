import Story from '../models/story.model.js'; 

// Read All
export const findAllStories = (req, res) => {
    Story.find()
        .then((allStories) => {
            res.status(200).json(allStories); 
        })
        .catch((err) => {
            console.error("Error fetching stories:", err);
            res.status(500).json({ message: "Internal Server Error", error: err });
        });
};
// Read One (Finding by _id)
export const findOneStory = (req, res) => {
    console.log(req.params); 
    Story.findOne({ _id: req.params.id })
        .then((oneStory) => {
            res.status(200).json(oneStory); 
        })
        .catch((err) => {
            console.error("Error fetching story:", err); 
            res.status(500).json(err); 
        });
};

// Create
export const createStory = (req, res) => {
    Story.create(req.body)
        .then((newStory) => {
            res.status(201).json(newStory); 
        })
        .catch((err) => {
            console.error("Error creating story:", err); 
            res.status(500).json(err); 
        });
};

// Update (Finding by _id)
export const updateStory = (req, res) => {
    Story.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then((updateStory) => {
            res.json(updateStory); 
        })
        .catch((err) => {
            console.error("Error updating story:", err);
            res.status(500).json(err); 
        });
};

// Delete (Finding by _id)
export const deleteStory = (req, res) => {
    Story.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error("Error deleting story:", err); 
            res.status(500).json(err); 
        });
};