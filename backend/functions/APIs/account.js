const firebase = require('firebase');

const {db} = require('../utils/admin');
const config = require('../utils/config');

firebase.initializeApp(config['config']);
const userRef = db.collection('users');
// Login User
 exports.loginUser = (request, response) => {
     const userDetails = {
         username: request.body.username,
         password: request.body.password
     }
     firebase
            .auth()
            .signInWithEmailAndPassword(userDetails.username + '@hacker-news.com', userDetails.password)
            .then((data) => {
                return data.user.uid;
            })
            .then((token) => {
                return response.json({
                    uid: token
                })
            })
            .catch((err) => {
                console.log(err)
                return response.status(403).json({
                    general: 'wrong credentials, please try again'
                });
            })
 }

 // Sign Up
 exports.signUpUser = (request, response) => {
    //  const body = JSON.parse(request.body);
    //  console.log(body);
     const newUser = {
         username: request.body.username,
         password: request.body.password
     }
     db
        .collection('users')
        .where("username", "==", newUser.username)
        .get()
        .then((data) => {
            if (data.size > 0) {
                return response.status(400).json({
                    username: 'Username already taken'
                });
            } else {
                return firebase
                            .auth()
                            .createUserWithEmailAndPassword(
                                newUser.username + '@hacker-news.com', 
                                newUser.password
                            );

            }
        })
        .then((data) => {
            let uid = data.user.uid;
            const userData = {
                username: newUser.username,
                createdAt: new Date().toISOString(),
                uid: uid,
                upvotedPosts: [],
                uploadedPosts: []
            }
            db
                .doc(`/users/${uid}`)
                .set(userData)
                .then(() => {
                    return response.status(201).json({
                        uid: uid
                    });

                })
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
				return response.status(400).json({ 
                    Username: 'Username already in use' 
                });
			} else {
				return response.status(500).json({ 
                    general: 'Something went wrong, please try again' 
                });
			}
        })
 }
 
 exports.getUserDetails = (request, response) => {
    userRef
        .doc(request.query.uid)
        .get()
        .then((d) => {
            return response.status(200).json(d.data());
        })
        .catch((err) => {
            return response.status(500).json({
                Error: err.error
            })
        })
}