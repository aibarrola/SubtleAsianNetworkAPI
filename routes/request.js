const router = require('express').Router();
const Request = require('../models/request.model');

router.route('/').post((req,res)=>{
    const{requesterID, school, organization} = req.body;
    const status = "pending";
    const newRequest = new Request({requesterID, school, organization, status} );
    newRequest.save()
    .then(res.json("Request successfully added"))
    .catch(err => res.status(400).json("Error: " + err) );
});

router.route('/').get((req,res)=>{
    Request.find({})
    .then(requests => res.send(requests))
});

router.route('/:id/status').put((req, res)=>{
    Request.findOneAndUpdate({"_id": req.params.id},
    {$set: {'status': req.body.status}}, {new: true})
    .then(newRequest=>res.send(newRequest))
    .catch(err=>res.json("Error: " +err))
});

module.exports = router;