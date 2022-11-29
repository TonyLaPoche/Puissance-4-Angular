import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  message: string = 'Ajouter des joueurs pour commencer';

  playerName1: string ;
  playerName2: string ;

  loginForm = new FormGroup({
    player1 : new FormControl(),
    player2 : new FormControl(),
  });
  auth!: AuthService;

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {
      this.playerName1=''
      this.playerName2=''
     }

  ngOnInit() {
    this.auth = this.authService
  }
  
  onSubmit() {
    if ( this.loginForm.value.player1 == null && this.loginForm.value.player2 == null) {
      console.log('nous ne pouvons vous connecter');
    } else {
      console.log(this.loginForm);
      this.setPlayersName(this.loginForm.value.player1, this.loginForm.value.player2) 
      this.login()
    }
  }

  setPlayersName(player1:string, player2:string) {
    this.playerName1 = player1
    this.playerName2 = player2
  }


  setMessage() {
    if (this.auth.isLoggedin) {
      this.message = 'Vous êtes connectés'
    } else {
      this.message = 'Les champs ne sont pas remplit'
    }
  }

  login() {
    this.auth.login(this.playerName1, this.playerName2)
      .subscribe((isLoggedin:boolean) => {
        this.setMessage();
        if(isLoggedin) {
          this.router.navigate(['/game'])
        }
      })
  }

}
