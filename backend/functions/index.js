const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const app = require("express")();
const {
    signUpUser,
	loginUser
} = require("./APIs/account");

// const {
//     uploadPost,
//     getPosts
// } = require("./APIs/posts");


// Account
app.post("/signUpUser", signUpUser);
app.post("/loginUser", loginUser);

// Posts
// app.post("/uploadPost", uploadPost);
// app.get("/getPosts", getPosts);

exports.api = functions.https.onRequest(app);

