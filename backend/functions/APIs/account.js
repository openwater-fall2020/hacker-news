const firebase = require('firebase');

const {db} = require('../utils/admin');
const config = require('../utils/config');

firebase.initializeApp(config['config']);

// Login User
 exports.loginUser = (request, response) => {
    // const body = JSON.parse(request.body);
     const userDetails = {
         username: request.body.username,
         password: request.body.password
     }
     firebase
            .auth()
            .signInWithEmailAndPassword(userDetails.username + '@hacker-news.com', userDetails.password)
            .then((data) => {
                return data.user.getIdToken();
            })
            .then((token) => {
                return response.json({
                    loginToken: token
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
     console.log(request.body);
    //  const body = JSON.parse(request.body);
    //  console.log(body);
     const newUser = {
         username: request.body.username,
         password: request.body.password
     }

     let token, userId;
     db
        .doc(`/users/${newUser.username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
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
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idtoken) => {
            token = idtoken;
            const userData = {
                username: newUser.username,
                createdAt: new Date().toISOString(),
                uid: userId
            }
            return db
                    .doc(`/users/${newUser.username}`)
                    .set(userData);
        })
        .then(() => {
            return response.status(201).json({
                signUpToken: token
            });
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
				return response.status(400).json({ email: 'Username already in use' });
			} else {
				return response.status(500).json({ general: 'Something went wrong, please try again' });
			}
        })
 }