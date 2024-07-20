import { Random } from "random-js";

abstract class Deck {
  protected random = new Random();
  protected cards: Card[] = [];
  protected drawn: Card[] = [];
  protected undrawn: Card[] = [];

  get left() {
    return this.undrawn.length;
  }

  draw(): Card {
    if (this.undrawn.length > 0) {
      const draw = this.undrawn.pop() as Card;
      this.drawn.push(draw);
      return draw;
    } else {
      throw Error("Deck is empty.");
    }
  }

  shuffle() {
    this.drawn = [];
    this.undrawn = this.random.shuffle(this.cards);
  }
}

class SuitedDeck extends Deck implements Iterable<Card> {
  private _suit: string;
  constructor(suit: string) {
    super();
    this._suit = suit;
    // deno-lint-ignore no-explicit-any
    this.cards = Object.keys(values).map((v) => new Card(v as any, suit));
    this.shuffle();
  }

  [Symbol.iterator](): Iterator<Card, any, undefined> {
    return {
      next: () => {
        return {
          done: this.undrawn.length == 0,
          value: this.draw(),
        };
      },
    };
  }

  get suit() {
    return this._suit;
  }
}

class Card {
  suit: string;
  value: keyof typeof values;
  constructor(value: keyof typeof values, suit: string) {
    this.value = value;
    this.suit = suit;
  }
  toString(): string {
    return `${this.value} of ${this.suit}`;
  }
}

const values = {
  ace: 14,
  king: 13,
  queen: 12,
  jack: 11,
  10: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

export { Deck, SuitedDeck, Card, values };
