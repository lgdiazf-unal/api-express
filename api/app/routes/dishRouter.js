const express = require('express');
const bodyParser = require('body-parser');

const disRouter = express.Router();

disRouter.use(bodyParser.json());


disRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Contet-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('Will send all the dishes to you!');
})
.post((req,res,next)=>{
    res.end('Will add the dish: ' + req.body.name + ' whit details : ' + req.body.description)
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation not supported on /dishes')
})
.delete((req,res,next)=>{
    res.end('delete all the dishes');
});

disRouter.route('/:dishId')
.get((req,res,next)=>{
    res.end('Will send details of the dish: ' 
    + req.params.dishId + ' to you!');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ 
     req.params.dishId);
})
.put((req,res,next)=>{
    res.write('Updating the dish: ' + req.params.dishId + '\n')
    res.end('Will update the dish : ' + req.body.name + 
    'with details : ' + req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deliting dish : ' + req.params.dishId);
});


module.exports = disRouter;