import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./Word";

import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    images: [
      { src: img0, alt: "0 wrong guesses" },
      { src: img1, alt: "1 wrong guesses" },
      { src: img2, alt: "2 wrong guesses" },
      { src: img3, alt: "3 wrong guesses" },
      { src: img4, alt: "4 wrong guesses" },
      { src: img5, alt: "5 wrong guesses" },
      { src: img6, alt: "6 wrong guesses" },
    ],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    let gw = this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
    return gw.join("");
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  playAgain() {
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
  }
  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    const answer = this.state.answer;
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const isWinner = this.guessedWord() === answer;

    let gameState = this.generateButtons();
    if (isWinner) gameState = "You win!";
    if (gameOver) gameState = `You Loose! The correct answer was "${answer}"`;
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        {!gameOver && (
          <img
            src={this.props.images[this.state.nWrong].src}
            alt={this.props.images[this.state.nWrong].alt}
          />
        )}

        <p>
          {this.state.nWrong > 0 &&
            !gameOver &&
            `Number wrong: ${this.state.nWrong}`}
        </p>
        <p className="Hangman-word">{!gameOver && this.guessedWord()}</p>
        <p className="Hangman-btns">{gameState}</p>
        <button className="play-again" onClick={this.playAgain}>
          Play Again!
        </button>
      </div>
    );
  }
}
// this.guessedWord()
export default Hangman;
