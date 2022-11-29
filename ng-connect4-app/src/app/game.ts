export class Game{
    id!: string;
    row!: string;
    cellPos!: Position;
    cell: IsPlayed;
    
    constructor(
      cell: IsPlayed = IsPlayed.Empty
    ) {
        this.cell = cell;
      }
    }
  export enum IsPlayed  {
    Red = 'red',
    Yellow = 'yellow',
    Empty = 'Empty',
  }

  export interface Position {
    X:number,
    Y:number,
  }

export class Players {
  name:string;
  color:Color;

  constructor(
    name:string, color:string
  ) {
    this.name = ''
    this.color = Color.Red
  }
}

export interface Round {
  playerTurn: Players;
  nextPlayerTurn: Players;
  strokeLeft: number;
}

export enum Color {
  Red = "red",
  Yellow = "yellow",
}