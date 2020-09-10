const functions = require('firebase-functions');
const cors = require('cors');
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

const {
    uploadPost,
    postComments,
    getPosts,
    getComments
} = require("./APIs/posts");



app.use(cors());
// Account
app.post("/signUpUser", signUpUser);
app.post("/loginUser", loginUser);

// Posts
app.post("/uploadPost", uploadPost);
app.post("/postComments", postComments);
app.get("/getPosts", getPosts);
app.get("/getComments", getComments);

exports.api = functions.https.onRequest(app);

