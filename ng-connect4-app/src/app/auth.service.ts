import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  players: string[] | undefined; 
  isLoggedin: boolean = false;

  login(player1:string, player2:string):Observable<boolean> {
    
    const isLoggedin = (player1.length >= 2 && player2.length >= 2);
    if (isLoggedin) {
      this.keepInMemory(player1, player2)
    }
    return of(isLoggedin).pipe(
        delay(500),
        tap(isLoggedin => this.isLoggedin = isLoggedin)
      );
  }

  keepInMemory(player1:string, player2:string ) {
    this.players = [player1, player2];
    console.log(this.players[0], this.players[1]);
  }

}
