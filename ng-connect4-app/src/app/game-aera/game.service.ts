import { Injectable } from '@angular/core';
import { Game, IsPlayed, Players, Round } from '../game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  isPlayable: boolean = false;
  isWinner:boolean= false;
  message:string= '';

  play(array:Game[], cellPosY:number, colorPlayer: string):void {
    
    for (let i = (array.length - 1); i >= 0 ; i--) {      
      if (array[i].cellPos.Y == cellPosY && array[i].cell == IsPlayed.Empty ) {
        if (colorPlayer == IsPlayed.Red) {
          array[i].cell = IsPlayed.Red;
          return
        } else {
          array[i].cell = IsPlayed.Yellow
          return
        }
      }
    }
  }
  

  nextRound(round: Round, player1: Players, player2: Players) {
      if (round.playerTurn === player1) {
        console.log(`C'est au tour de ${player2.name} de couleur ${player2.color}`);
        round.playerTurn = player2
        round.nextPlayerTurn = player1
      } else {
        round.playerTurn = player1
        round.nextPlayerTurn = player2
        console.log(`C'est au tour de ${player1.name} de couleur ${player1.color}`);
      }
  }
  /**
   * Au click d'un utilisateur (si il n'y a pas de gagnant).
   * Lancement des méthodes ( play, nextRound, scanArray )
   * 
   * @param round Object du tour courant
   * @param player1 joueur 1 identifiant et couleur
   * @param player2 joueur 2 identifiant et couleur
   * @param array Plateau du jeu
   * @param cellPosY Colone selectionner par le joueur
   * @param colorPlayer Couleur du Joueur Courant
   */
  isPlay (
    // set Round params
    round: Round, player1: Players, player2: Players,
    // set action params
    array:Game[], cellPosY:number, colorPlayer: string
  ) {

    if (!this.isWinner) {
      this.play(array, cellPosY, colorPlayer)
      this.nextRound(round, player1, player2)
      this.scanArray(array);
      // console.log('le joueur a jouer sur cette colonne');
    } else {
      console.log('peut pas jouer sur cette colonne');
    }
  }
  /**
   * Scan le plateau du jeu de la dernière cellules à la première
   * Et à chaque itération, vérifie les voisins s'ils sont vide.
   * 
   * @param array correspond au tableau du jeu 6 par 7
   */
  scanArray(array:Game[]) {
    for (let i = (array.length - 1); i >= 0 ; i--) {

      // SCAN HORIZONTALE
      if (this.scanCell(array[i])) {
        let pointRedX: number = 0;
        let pointYellowX: number = 0;

        for (let it = i; it >= (i - 3); it--) {

          if (this.scanCell(array[it])) {
            if (array[it].cellPos.Y != 1) {
              array[it].cell === IsPlayed.Red ? pointRedX = pointRedX + 1 : pointYellowX = pointYellowX + 1;
            } else if (array[it].cellPos.Y === 1 && pointRedX === 3 || pointYellowX === 3) {
              array[it].cell === IsPlayed.Red  ? pointRedX = pointRedX + 1 : pointYellowX = pointYellowX + 1;
            }
          }
          this.isAWinner(pointRedX, pointYellowX);          
        }
      }

      // SCAN VERTICAL
      if (this.scanCell(array[i])) {
        let pointRedY: number = 0;
        let pointYellowY: number = 0;
        let count:number = 0;

        for (let iV = i; iV >= (i - 3) ; iV--) {


          if ( array[i - count] && this.scanCell(array[i - count]) ) {

            array[i - count].cell === IsPlayed.Red ? pointRedY = pointRedY + 1 : pointYellowY = pointYellowY + 1;
          }
          this.isAWinner(pointRedY, pointYellowY);
          count += 7;
        }
      }

      //SCAN DIAGONALE LEFT
      if (this.scanCell(array[i])) {
        let pointRedY: number = 0;
        let pointYellowY: number = 0;
        let count:number = 0;

        for (let iV = i; iV >= (i - 3) ; iV--) {


          if ( array[i - count] && this.scanCell(array[i - count]) ) {

            array[i - count].cell === IsPlayed.Red ? pointRedY = pointRedY + 1 : pointYellowY = pointYellowY + 1;
          }
          this.isAWinner(pointRedY, pointYellowY);
          count += 8;
        }
      }

      //SCAN DIAGONALE RIGHT
      if (this.scanCell(array[i])) {
        let pointRedY: number = 0;
        let pointYellowY: number = 0;
        let count:number = 0;

        for (let iV = i; iV >= (i - 3) ; iV--) {


          if ( array[i - count] && this.scanCell(array[i - count]) ) {

            array[i - count].cell === IsPlayed.Red ? pointRedY = pointRedY + 1 : pointYellowY = pointYellowY + 1;
          }
          this.isAWinner(pointRedY, pointYellowY);
          count += 6;
        }
      }
    }
  }

  isAWinner(pointRed:number, pointYellow:number) {
    if (pointRed === 4 && pointYellow === 0) {
      this.winMessage('rouge');
      this.isWinner = true;
    }   
    if (pointYellow === 4 && pointRed === 0) {
      this.winMessage('jaune');
      this.isWinner = true;
    }
  }

  winMessage(joueur:string) {
    return this.message = `Le joueur ${joueur} à gagner !` 
  }

  scanCell(currentCell:Game):boolean {
    if ( currentCell.cell != IsPlayed.Empty ) {
      return true
    }
    return false
  }
}