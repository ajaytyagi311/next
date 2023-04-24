const admin = require('firebase-admin');
var serviceAccount = require("../dbConfig.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-project-name.firebaseio.com"
  });
}

export default admin;