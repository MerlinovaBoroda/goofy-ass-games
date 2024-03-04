import React, { useState } from 'react'

import "./TicTacToe.css"


function Cell({value, onCellClick, index}) {
  return <button data-index={index} className='cell' onClick={onCellClick}>{value}</button>
}

export default function TicTacToe() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [nextMoveX, setNextMovex] = useState(true);

  function checkWinner(cells) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return;
  }

  const winner = checkWinner(cells);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (nextMoveX? "X" : "O");
  }


  function handleClick(event) {
    const index = event.target.dataset.index;
    if(cells[index] || checkWinner(cells)){
      return;
    }
    const nextCells = cells.slice();
    if(nextMoveX){
      nextCells[index] = "X";
      setNextMovex(false);
    } else {
      nextCells[index] = "O";
      setNextMovex(true);
    }
    
    setCells(nextCells);
  }

  function handleRestart() {
    setCells(Array(9).fill(null));
    setNextMovex(true);
  }

  return (
    <div className='gameContainer'>
        <h1>Tic Tac Toe</h1>
        <div className="cellContainer">
          {
            cells.map((cell, index) => {
              return <Cell
                        key={index}
                        value={cell}
                        onCellClick={handleClick}
                        index={index}
                      />
            })
          }
        </div>
        <h3>{status}</h3>
        <button onClick={handleRestart}>Restart</button>
    </div>
  )
}