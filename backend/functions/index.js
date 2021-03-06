const functions = require('firebase-functions');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const app = require("express")();
const cors = require('cors');
const {
    signUpUser,
    loginUser,
    getUserDetails
} = require("./APIs/account");

const {
    uploadPost,
    postComments,
    getPosts,
    getComments,
    deletePost,
    deleteComment,
    updatePost,
    updateComment,
    upvotePost,
    downvotePost
} = require("./APIs/posts");

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
// Account
app.post("/signUpUser", signUpUser);
app.post("/loginUser", loginUser);
app.get("/getUserDetails", getUserDetails);

// Posts
app.post("/uploadPost", uploadPost);
app.post("/postComments", postComments);
app.get("/getPosts", getPosts);
app.get("/getComments", getComments);
app.post("/deletePost", deletePost);
app.post("/deleteComment", deleteComment);
app.post("/updatePost", updatePost);
app.post("/updateComment", updateComment);
app.post("/upvotePost", upvotePost);
app.post("/downvotePost", downvotePost);

exports.api = functions.https.onRequest(app);

