import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
//import { environment } from 'src/environments/environment';


const FIREBASE_SETTINGS = {
  apiKey: "AIzaSyDrzTcoxAf5WhexxzSVnN0QyNA1oIvGGf0",
  authDomain: "oauth2-f626c.firebaseapp.com",
  projectId: "oauth2-f626c",
  storageBucket: "oauth2-f626c.appspot.com",
  messagingSenderId: "305293313491",
  appId: "1:305293313491:web:40b816aef00c945fcd5b26",
  measurementId: "G-72HQR6KHFC"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) {
    firebase.initializeApp(FIREBASE_SETTINGS);
    firebase.auth().onAuthStateChanged((user: any) =>{
      console.log('Evento onAuthStateChanged: ', user);
    });
   }

   async loginOAuth2(provider: string){
    let oauth2 = null;
    switch(provider){
      case 'Google':
        oauth2 = new firebase.auth.GoogleAuthProvider();
        oauth2.setCustomParameters({prompt: 'select_account'});
        break;
      case 'Microsoft':
        oauth2 = new firebase.auth.OAuthProvider('microsoft.com');
        oauth2.setCustomParameters({prompt: 'select_account'});
        break;
      case 'Apple':
        oauth2 = new firebase.auth.OAuthProvider('apple.com')
        break;
      case 'Yahoo':
        oauth2 = new firebase.auth.OAuthProvider('yahoo.com')
        oauth2.setCustomParameters({prompt: 'login'});
        oauth2.addScope('email');
        oauth2.addScope('profile');
        break;
      case 'Facebook':
        oauth2 = new firebase.auth.FacebookAuthProvider();
        break;
      case 'Twitter':
        oauth2 = new firebase.auth.TwitterAuthProvider();
        break;
      default:
        oauth2 = new firebase.auth.GoogleAuthProvider();
        oauth2.setCustomParameters({prompt: 'select_account'});
        break;
    }

    return await this.fireAuth.signInWithPopup(oauth2)
      .then(() => firebase.auth().currentUser)

      .catch((error: any) =>{
        return{
          success: false,
          error
        }
      })
  }
}


