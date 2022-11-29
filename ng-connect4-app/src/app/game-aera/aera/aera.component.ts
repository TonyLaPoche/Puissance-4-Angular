import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Color, Game, IsPlayed, Players, Round } from '../../game'
import { GameService } from '../game.service';
@Component({
  selector: 'app-aera',
  template: `
    <div class="game-container">

    <div *ngIf="this.GameService.isWinner" id="myModal" class="modal" myModal>
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" myModal>&times;</span>
        <p class="modal-content-message">{{ currentRound.nextPlayerTurn.name }} win !</p>
        <hr class="separator">
        <div class="modal-content-btn">
          <button class="btn" type="button" (click)="this.reload()">again ?</button>
          <button class="btn" type="button" (click)="this.toGoHome()">new Challenger</button>
        </div>
      </div>
    </div>

      <div class="game-aera">
        <div class="game-zone">
          <div
            *ngFor="let zone of gameAeraClickable"
            class="game-zone-item"
            (click)='GameService.isPlay(
                currentRound,
                joueur1,
                joueur2,
                gameAera,
                zone.cell,
                currentRound.playerTurn.color
              )'
              appGame>
          </div>
        </div>
        <div class="game-aera-decoration">
          <div class="game-cell" *ngFor="let el of gameAera">
            <div [ngClass]="[Klass, el.cell ]">
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AeraComponent implements OnInit {

  public joueur1: Players = { name: this.Login.players![0], color: Color.Red };
  public joueur2: Players = { name: this.Login.players![1], color: Color.Yellow };
  public gameAera: Game[] = [];

  Klass: string = "game-jeton";
  gameAeraClickable: any[] = [];


  currentRound: Round = {
    playerTurn: this.joueur1,
    nextPlayerTurn: this.joueur2,
    strokeLeft: 42
  };


  constructor(
    public GameService: GameService,
    private Login: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.initGame();
    this.initClickableAera();
  }

  toGoHome() {
    this.router.navigate(["/"])
    this.initGame()
    this.GameService.isWinner = false;
  }

  reload() {
    this.gameAera = []
    this.initGame()
    this.GameService.isWinner = false;
  }

  initGame() {
    let newArray = this.gameAera;
    for (let r = 1; r <= 6; r++) {
      for (let c = 1; c <= 7; c++) {
        newArray.push({
          id: `Row${r}Cell${c}`,
          row: `Row ${r}`,
          cellPos: { X: r, Y: c },
          cell: IsPlayed.Empty
        })

      }

    }
    return this.gameAera = newArray;
  }

  initClickableAera() {
    let array = this.gameAeraClickable;
    for (let i = 1; i <= 7; i++) {
      array.push({ id: `zone ${i}`, cell: i })
    }
    return this.gameAeraClickable = array;
  }
}