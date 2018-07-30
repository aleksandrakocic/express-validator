const Repository = require('../Repositories/UsersRepository');

const mongo = require('mongodb');

const { check, validationResult } = require('express-validator/check');

let UsersCollection = {};
const database = require('../Db').then(function(db) {
	UsersCollection = db.collection('Users');
});

exports.Index = function(req, res){
    Repository.getUsers({}, function(err, result){
        if (err) throw err;
        const users = [];
        result.forEach((user, key)=>{
            users.push({
                id: user._id,
                displayName: user.firstName + user.lastName,
                username: user.username,
				avatar: user.avatar,  
				password: user.password
			})
		// just example - username as email
		
		req.check('username').isEmail(),
		req.check('password').isLength({ min: 5 })
	  
        })
		res.send(users).then(user => res.json(user));
	})
	    var errors = req.validationErrors();
	   if(errors){
	        req.errors = errors;
	        req.success = false;
 	        res.redirect('/');
	    }
	    else{
	        req.session.success = true;
	        res.redirect('/users');
	}
}

exports.Show = function (request, response) {
	Repository.getUsers(
		{'_id': new mongo.ObjectID(request.params.id)},
		function(err, results) {
			if (err) throw err;
			response.send(results);
		}
	);
}

exports.Insert = function (request, response) {

	let newUser = {
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		username: request.body.username,
		password: request.body.password,
		group: request.body.group
	};
        // username must be an email
		request.check('username').isEmail(),
		// password must be at least 5 chars long
		request.check('password').isLength({ min: 5 })


	if (!newUser.username || !newUser.username.length) {
		response.status(400).send({
			'status': 400,
			'message': 'enter a username'
		});
		return;
	}

	if (!newUser.password || !newUser.password.length) {
		response.status(400).send({
			'status': 400,
			'message': 'enter a password'
		});
		return;
	}

	var errors = req.validationErrors();
	if(errors){
	   req.errors = errors;
	   req.success = false;
	   res.redirect('/');
	}
	else{
	   req.success = true;
	   res.redirect('/users');
	}


	Repository.insertUser(newUser, function(err, results) {

		Repository.getUser(
			{'username': newUser.username},
			
			function(err, results) {
				response.send(results);
			}) .then(user => res.json(user));
	});
}

exports.Delete = function (request, response) {
	Repository.deleteUser(
		{'_id': new mongo.ObjectID(request.params.id)},
		function(err, results) {
		if (err) throw err;
		response.send(results);
	});
}

exports.Update = function (request, response) {
    let userUpdates = {
        $set: {
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                username: request.body.username,
                password: request.body.password,
                avatar: request.body.avatar,
                group : request.body.group,
                subscriptions: request.body.subscriptions
        }
	}
	
			request.check('username').isEmail(),
			request.check('password').isLength({ min: 5 })

			
	Repository.updateUser(
        {'_id': new mongo.ObjectID(request.params.id)},
        userUpdates,
		function(err, results) {
		if (err) throw err;
		response.send(results).then(user => res.json(user));
		var errors = req.validationErrors();
		if(errors){
		   request.errors = errors;
		   request.success = false;
		   request.redirect('/');
		}
		else{
			request.success = true;
		   response.redirect('/users');
		}
	});
}