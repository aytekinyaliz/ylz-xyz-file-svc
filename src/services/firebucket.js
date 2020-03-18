var admin = require("firebase-admin");

const config = require('../config');

admin.initializeApp({
  credential: admin.credential.cert(config.firestoreServiceAccount),
  storageBucket: config.storageBucket
});

module.exports = admin.storage().bucket();
