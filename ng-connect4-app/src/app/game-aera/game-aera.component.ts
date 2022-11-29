import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-game-aera',
  templateUrl: './game-aera.component.html'
})
export class GameAeraComponent implements OnInit {

  joueur1:string;
  joueur2:string;

  constructor(private auth: AuthService) { 
    this.joueur1 = this.auth.players![0] 
    this.joueur2 = this.auth.players![1] 
  }

  ngOnInit(): void {
  }

}
