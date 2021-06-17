import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
//import { environment } from 'src/environments/environment';
import { UsersComponent } from './pages/users/users.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

const FIREBASE_SETTINGS = {
  apiKey: "AIzaSyDrzTcoxAf5WhexxzSVnN0QyNA1oIvGGf0",
  authDomain: "oauth2-f626c.firebaseapp.com",
  projectId: "oauth2-f626c",
  storageBucket: "oauth2-f626c.appspot.com",
  messagingSenderId: "305293313491",
  appId: "1:305293313491:web:40b816aef00c945fcd5b26",
  measurementId: "G-72HQR6KHFC"
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NotfoundComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    AngularFireModule.initializeApp(FIREBASE_SETTINGS),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }


