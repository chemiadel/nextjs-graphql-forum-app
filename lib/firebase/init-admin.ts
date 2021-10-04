// Import the functions you need from the SDKs you need
import admin from "firebase-admin";
const serviceAccount = require ("./serviceAccount.json")

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// console.log('service acc', serviceAccount)

// const serviceAccount = {
//   "type": process.env.type,
//   "project_id": process.env.project_id,
//   "private_key_id": process.env.private_key_id,
//   "private_key": process.env.private_key,
//   "client_email": process.env.client_email,
//   "client_id": process.env.client_id,
//   "auth_uri": process.env.auth_uri,
//   "token_uri": process.env.token_uri,
//   "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
//   "client_x509_cert_url": process.env.client_x509_cert_url
// }

if(!admin.apps.length){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export default admin