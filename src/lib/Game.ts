import { Card, SuitedDeck } from "./oracle/deck";

class Game {
  private _ended: boolean;
  private _started: boolean;
  private _current: Card;
  private _deck: SuitedDeck[];
  private _season = 0;
  private _message = "";

  private _turn = {
    draw: false,
    projects: false,
    action: false
  }

  constructor() {
    console.log("Generating decks...");
    const spring: SuitedDeck = new SuitedDeck("spring");
    const summer: SuitedDeck = new SuitedDeck("summer");
    const autumn: SuitedDeck = new SuitedDeck("autumn");
    const winter: SuitedDeck = new SuitedDeck("winter");
    console.log("Done!");
    this._deck = [spring, summer, autumn, winter];
    [this._started, this._ended] = [true, false];
    this._current = this._deck[this._season].draw();
  }

  get currentCard() {
    return this._current;
  }

  get currentSeason() {
    switch (this._season) {
      case 0:
        return "spring";
      case 1:
        return "summer";
      case 2:
        return "autumn";
      case 3:
        return "winter";
    }
  }

  get ended() {
    return this._ended;
  }

  get remaining() {
    return this._deck[this._season].left;
  }
  
  get message() {
    return this._message;
  }

  get turnStatus() {
    return this._turn;
  }


  turn() {
    this._turn.draw = false;
    this._turn.projects = false;
    this._turn.action = false;
  }

  draw() {
    this._message = "";
    if (this._ended) {
      return this.currentCard;
    }
    if (this._deck[this._season].left === 0) {
      this._message = `New season has started: ${this._season}`;
      this._season++;
      this.draw();
    } else {
      if (
        this.currentCard.suit === "summer" &&
        this.currentCard.value === "queen"
      ) {
        this._message = "2 cards have been discarded."
        try {
          this._deck[this._season].draw();
          this._deck[this._season].draw();
        } catch(_err) {
          this.draw();
        }
      }
      this._current = this._deck[this._season].draw();
      if (
        this.currentCard.suit === "winter" &&
        this.currentCard.value === "king"
      ) {
        this.end();
        return this.currentCard;
      }
      this._turn.draw = true;
      return this.currentCard;
    }
  }

  end() {
    this._ended = true;
    this._message = "The game is over.";
  }
}

const GameInstance = new Game();
export default GameInstance;
