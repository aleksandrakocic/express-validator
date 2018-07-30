let PostsCollection = {};

const mongo = require('mongodb');

const database = require('../Db').then(function(db) {
	PostsCollection = db.collection('Posts');
});

exports.getPosts = function (args, callback) {
	PostsCollection.find(args).toArray(callback);
}

exports.getPost = function (args, callback) {
	PostsCollection.findOne(args, callback);
}

exports.insertPost = function (user, callback) {
	PostsCollection.insertOne(user, callback);
}

exports.deletePost = function (query, callback) {
	PostsCollection.deleteOne(query, callback);
}

exports.updatePost = function (query, update, callback) {
	PostsCollection.updateOne(query, update, { upsert: true }, callback);
}