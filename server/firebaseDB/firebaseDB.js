const admin = require('firebase-admin')

var serviceAccount = require('./secret.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

var db = admin.firestore()

//adding data
var docRef = db.collection('users').doc('alovelace')

var setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  email: 'ada.lovelace@gmail.com'
})

console.log('reached firebaseDB')
