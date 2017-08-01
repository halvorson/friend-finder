// Global variables
var friends = [];
var incrementer = 0;

module.exports = function(app) {
	// Get existing people
	app.get('/api/friends', function(req, res) {
		return res.json(friends);
	});

	// Add new person (post)
	app.post('/api/addFriend', function(req, res) {
		var newFriend = req.body;
		newFriend.uniqueId = incrementer++;
		var minDistance = 40;
		var currentLeader;
		friends.forEach(function(friend) {
			var distance = calcDistance(friend,newFriend);
			if (distance < minDistance) {
				minDistance = distance;
				currentLeader = friend;
			}
		});
		res.json(currentLeader);
		console.log(currentLeader);
		friends.push(newFriend);
	});

	var calcDistance = function(g1, g2) { 
		var runningTally = 0;
		for (var i = 0; i<10; i++) {
			runningTally += Math.abs(g1.scores[i] - g2.scores[i]);
		}
		return runningTally;
	}

	// Clear
	app.get('/api/clearFriends', function(req, res) {
		friends = [];
		return res.json(friends);
	});

	// Seed
	app.get('/api/seedFriends', function(req, res) {
		var friendSeed = [{
			"name":"Ahmed",
			"photo":"https://randomuser.me/api/portraits/men/99.jpg",
			"scores":[
			5,
			1,
			4,
			4,
			5,
			1,
			2,
			5,
			4,
			1
			]
		},{
			"name":"John",
			"photo":"https://randomuser.me/api/portraits/men/62.jpg",
			"scores":[
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1
			]
		},{
			"name":"Bill",
			"photo":"https://randomuser.me/api/portraits/men/27.jpg",
			"scores":[
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5
			]
		}];
		friendSeed.forEach( function(obj) {
			friends.push(obj);
		});
		return res.json(friends);
	});	
};