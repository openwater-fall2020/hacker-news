var admin = require("firebase-admin");

var serviceAccount = require("./hacker-news-a2575-firebase-adminsdk-mh5fm-0f3c2bc97f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hacker-news-a2575.firebaseio.com"
});
const db = admin.firestore();
module.exports = {admin, db};