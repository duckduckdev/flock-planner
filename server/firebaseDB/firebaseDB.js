const admin = require('firebase-admin')

var serviceAccount = require('./secret.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

var firebaseDB = admin.firestore()

//adding data
var docRef = firebaseDB.collection('users').doc('alovelace')

var setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  email: 'ada.lovelace@gmail.com'
})

console.log('reached firebaseDB')

firebaseDB
  .collection('users')
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data())
    })
  })
  .catch(err => {
    console.log('Error getting documents', err)
  })

module.exports = firebaseDB
