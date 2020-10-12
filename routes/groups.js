const router = require('express').Router();
const Group = require('../models/group.model');
const Post = require('../models/post.model');

// @Route   GET /groups/
// @desc    Returns all groups
// @access  Public
router.route('/').get((req,res)=>{
    Group.find({})
    .select('-posts -links')
    .then( groups => res.send(groups));
})

// @Route   POST /groups/add/
// @desc    Adds a group to the collection
// @access  Public
router.route('/add').post((req,res)=>{
    const {groupName, description}= req.body;
    const newGroup = new Group({groupName, description})
    newGroup.save()
    .then(()=>res.json("Group added"))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/post/:id/add').post((req,res)=>{
    const id = req.params.id;
    const{author, date, type, content} = req.body;

    Group.findById(req.params.id)
    .then(group =>{
        const posts = group.posts;
        posts.push({author,date,type, content});
        group.save()
        .then(()=>res.json("Post added"))
        .catch(err => res.status(400).json('Error: ' + err))
    })

})

module.exports = router;