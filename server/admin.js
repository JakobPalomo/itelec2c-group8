const admin = require("firebase-admin");
const serviceAccount = require("./palengkerist-31337-6a4e784b0c18.json");
const { initializeApp } = require("firebase-admin/app");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = { admin };
