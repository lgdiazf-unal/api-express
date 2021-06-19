const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');

const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    Favorite.findOne({user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then(favorites=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Favorite.findOne({user: req.user._id})
    .then(favorite=>{
        if (favorite != null) {
            Favorite.findByIdAndUpdate(favorite._id, {
                $set: {dishes : req.body}
            }, { new: true })
            .then(favorite=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            },(err) => next(err))
            .catch((err) => next(err)); 
        }
        else {
            Favorite.create({user : req.user._id , dishes : req.body })
            .then(favorite=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            },(err) => next(err))
            .catch((err) => next(err));
        }
    })
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
	Favorite.deleteOne({user: req.user._id})
    .then(favorites=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    },(err) => next(err))
    .catch((err) => next(err));
});

favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200);})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Favorite.findOne({user: req.user._id})
    .then(favorites=>{
        let dishes = favorites.dishes;
        if (dishes.indexOf(req.params.dishId)==-1){
            dishes.push(req.params.dishId);
            favorites.save();
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    },(err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{

});


module.exports = favoriteRouter;