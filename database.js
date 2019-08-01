/*************************************************************************
 *
 * BANDA CONFIDENTIAL
 * __________________
 *
 *  Copyright (C) 2019
 *  Banda Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Banda Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Banda Incorporated
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Banda Incorporated.
 *
*************************************************************************/

module.exports = {
	connect: connect,
	objectId: objectId,
	usernameFromId: usernameFromId,
	idFromUsername: idFromUsername,
}

const PORT = 27018,
      MONGO_URL = `mongodb://localhost:${PORT}/DeepView`;

const mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;


// function create_mongodb() {
// 	connect(db => {
// 		db.collection.createIndex(
// 	}, console.error)
// }


function objectId(id) {
	return mongodb.ObjectID(id);
}

function connect (cbOk, cbErr) {
	MongoClient.connect(MONGO_URL, { useNewUrlParser : true}, (err, db) => {
		if (err) {
			console.error(`Error occrued: ${err}`);
			cbErr('An internal error occured');
		}
		else
			cbOk(db);
	})
}

function usernameFromId (id, cbOk, cbErr, cbNotFound, db=undefined) {
	function exec(db) {
		db.db('users').collection('users').findOne({_id: objectId(id)}, (err, res) => {
			if (err) {
				cbErr(err)
			} else if (!res) {
				cbNotFound()
			} else {
				cbOk(res.username)
			}
		});
	}

	if (db) {
		exec(db)
	} else {
		connect(exec)
	}
}

function idFromUsername (username, cbOk, cbErr, cbNotFound, db=undefined) {
	function exec(db) {
		db.db('users').collection('users').findOne({username: username}, (err, res) => {
			if (err) {
				cbErr(err)
			} else if (!res) {
				cbNotFound()
			} else {
				cbOk(res._id)
			}
		});
	}

	if (db) {
		exec(db)
	} else {
		connect(exec)
	}
}
