"use client";
import {useEffect, useState } from "react";


function Square({value, onClick}) {
  const className = `square ${value ? value.toLowerCase() : ""}`;
  return (
  <button className={className} onClick={onClick}>
    {value}
  </button>
  );
}

function Board({ squares, xIsNext, onPlay})  {
  const [isBlinking, setIsBlinking] = useState(false);

  function onSquareClick(idx) {
    if (squares[idx] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[idx] = xIsNext ? "X" : "O";
    onPlay(newSquares);
  }

  const winner = calculateWinner(squares);

  useEffect(() => {
    if (winner) {
      setIsBlinking(true);
      const timer = setTimeout(() =>
      setIsBlinking(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  return (
  <>
  
    {winner ? (
      <p>Winner is: {winner}</p>) : (<p>Next Player: {xIsNext ? "X" : "O"}</p>)}

  <div className={`game-board ${isBlinking ? "blinking-border" : ""}`}>
  <div className="board-row">
    <Square value={squares[0]} onClick={() => onSquareClick(0)}/>
    <Square value={squares[1]} onClick={() => onSquareClick(1)}/>
    <Square value={squares[2]} onClick={() => onSquareClick(2)}/>
  </div>
  <div className="board-row">
    <Square value={squares[3]} onClick={() => onSquareClick(3)}/>
    <Square value={squares[4]} onClick={() => onSquareClick(4)}/>
    <Square value={squares[5]} onClick={() => onSquareClick(5)}/>
  </div>
  <div className="board-row">
    <Square value={squares[6]} onClick={() => onSquareClick(6)}/>
    <Square value={squares[7]} onClick={() => onSquareClick(7)}/>
    <Square value={squares[8]} onClick={() => onSquareClick(8)}/>
  </div>
  </div>
  </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) { 
      return squares[a];
    }
  }

  return null;
}

export default function Game() {
  const [history, setHistory] =useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];


  function handlePlay(nextSquares) {
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    const description = `Go to move #${move + 1}`;
      return (
      <li key={move}>
        <button className="text" onClick={() => jumpTo(move + 1)}>{description}</button>
      </li>
      );
    });

  return (
    
    <div className="game">
      <div className="game-board">
        <div>
          <h1>Devon's Vintage Game</h1>
        </div>
     
        <button className="reset-button" onClick={resetGame}>Start New Game</button>
        <br />
        <br />
  
      <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
      
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
        </div>
         
    </div>
    
  );
}
