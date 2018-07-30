const Repository = require('../Repositories/PostsRepository');

const mongo = require('mongodb');

let PostsCollection = {};
const database = require('../Db').then(function(db) {
	UsersCollection = db.collection('Posts');
});

exports.Index = function(req, res){
    Repository.getPosts({}, function(err, result){
        if (err) throw err;
        const posts = [];
        result.forEach((post, key)=>{
            posts.push({
                id: post._id,
                title: post.title,
                text: post.text,
                image: post.image
                
            })
        })
        res.send(posts);
    
    })
}

exports.Show = function (request, response) {
	Repository.getPosts(
		{'_id': new mongo.ObjectID(request.params.id)},
		function(err, results) {
			if (err) throw err;
			response.send(results);
		}
	);
}

exports.Insert = function (request, response) {

	let newPost = {
		title: request.body.title,
		text: request.body.text,
		image: request.body.image
	};

	if (!newPost.title || !newPost.title.length) {
		response.status(400).send({
			'status': 400,
			'message': 'Enter a title'
		});
		return;
	}

	if (!newPost.text || !newPost.text.length) {
		response.status(400).send({
			'status': 400,
			'message': 'Enter some text'
		});
		return;
	}

	Repository.insertPost(newPost, function(err, results) {

		Repository.getPost(
			{'username': newPost.title},
			function(err, results) {
				response.send(results);
			});
	});
}

exports.Delete = function (request, response) {
	Repository.deletePost(
		{'_id': new mongo.ObjectID(request.params.id)},
		function(err, results) {
		if (err) throw err;
		response.send(results);
	});
}

exports.Update = function (request, response) {
    let postUpdates = {
        $set: {
			title: request.body.title,
			text: request.body.text,
			image: request.body.image
        }
    }
	Repository.updatePost(
        {'_id': new mongo.ObjectID(request.params.id)},
        postUpdates,
		function(err, results) {
		if (err) throw err;
		response.send(results);
	});
}