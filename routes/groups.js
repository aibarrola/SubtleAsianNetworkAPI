const router = require('express').Router();
const Group = require('../models/group.model');
const Post = require('../models/post.model');

// Middle ware
const auth = require('./middleware/auth');


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

// @Route   POST /groups/post/:id/add
// @desc    Adds a post to a specific group
// @access  Private BUT PUBLIC FOR TESTING NOW
router.route('/post/:id/add').post(/**auth,**/(req,res)=>{
    const{author, date, type, content} = req.body;

    Group.findById(req.params.id)
    .then(group =>{
       /**  if(group.users.include(req.user.user_id)){**/
        const posts = group.posts;
        posts.push({author,date,type, content});
        group.save()
        .then(()=>res.json("Post added"))
        .catch(err => res.status(400).json('Error: ' + err))
       /**  }else{
            res.status(400).json({ msg: 'User not authenticated to post'})
        }**/
    })
    .catch(err => res.status(400).json('Error: ' + err))

})

// @Route   GET /groups/:id
// @desc    Return a specific group
// @access  Public
router.route('/:id').get((req, res) => {
    Group.findById(req.params.id)
        .populate('users', '-hashedPassword')
        .exec((err,group)=>{
            res.json(group);
        })

})

// @Route   POST groups/link/:id/add
// @desc    Adds a link to a specific group
// @access  Private BUT PUBLIC FOR TESTING NOW
router.route('/link/:id/add').post(/**auth,**/(req,res)=>{

    Group.findById(req.params.id)
    .then(group =>{
       /**  if(group.users.include(req.user.user_id)){**/
        const links = group.links;
        links.push(req.body.link);
        group.save()
        .then(()=>res.json("Link added"))
        .catch(err => res.status(400).json('Error: ' + err))
       /**  }else{
            res.status(400).json({ msg: 'User not authenticated to post'})
        }**/
    })
    .catch(err => res.status(400).json('Error: ' + err))

})

// @Route   POST /groups/todo/:id/add
// @desc    Adds a todo to a specific group
// @access  Private BUT PUBLIC FOR TESTING NOW
router.route('/todo/:id/add').post(/**auth,**/(req,res)=>{
    const{description, checked} = req.body;

    Group.findById(req.params.id)
    .then(group =>{
       /**  if(group.users.include(req.user.user_id)){**/
        const toDos = group.toDos;
        toDos.push({description,checked});
        group.save()
        .then(()=>res.json("Todo added"))
        .catch(err => res.status(400).json('Error: ' + err))
       /**  }else{
            res.status(400).json({ msg: 'User not authenticated to post'})
        }**/
    })
    .catch(err => res.status(400).json('Error: ' + err))

})

// @Route   POST /groups/user/:id/add
// @desc    Adds a user to a specific group
// @access  Private BUT PUBLIC FOR TESTING NOW
router.route('/user/:id/add').post(/**auth,**/(req,res)=>{

    Group.findById(req.params.id)
    .then(group =>{
       /**  if(group.users.include(req.user.user_id)){**/
        const users = group.users;
        users.push(req.body.userId);
        group.save()
        .then(()=>res.json("User added"))
        .catch(err => res.status(400).json('Error: ' + err))
       /**  }else{
            res.status(400).json({ msg: 'User not authenticated to post'})
        }**/
    })
    .catch(err => res.status(400).json('Error: ' + err))

})

module.exports = router;