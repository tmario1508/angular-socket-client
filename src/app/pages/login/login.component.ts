import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { AuthService } from '../../services/auth.service';
import { SocketioService } from '../../services/socketio.service';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
 
  suscription$: Subscription;

  listaUsuarios: any[] = [];

  fotoDefault: string = 'src/assets/';

  constructor(public socket: SocketioService, private authSvc: AuthService, private router : Router) {
      this.suscription$ = this.socket.on('broadcast-message').subscribe((usersList: any) => {
        this.listaUsuarios = usersList;
      });
      firebase.auth().onAuthStateChanged((user: any) => {
        //console.log('Evento onAuthStateChanged: ', user);
      });
  }

  ngOnInit() {

  }

  loginOAuth2(provider: string) {
    console.log('Provider: ', provider);
    this.authSvc.loginOAuth2(provider)
      .then((user: any) => {
        this.socket.emit('signUp', {
          fullName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          apiKey: environment.API_KEY
        });
        console.log('Usuario: ', user.email);
        this.router.navigate(['/users'])
      })
      .catch((error) => {
        return {
          success: false,
          error
        }
      })
  }

  sendMessage(msg: string) {
    console.log(msg);
    this.socket.emit('message', {
      client: 'Angular', msg
    });
  }

  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
  }
  

}
