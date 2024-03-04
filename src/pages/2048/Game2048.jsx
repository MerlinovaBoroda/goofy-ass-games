import React, { useEffect, useState } from 'react'
import "./Game2048.css"
import cloneDeep from 'lodash.clonedeep';
import {useEvent} from './useEvent.jsx'

function Tile ({value, handleKeyDown}) {
  return <div tabIndex={0} className='tile' onKeyDown={handleKeyDown}>
    {value !== 0 ? value.toString() : ''} 
  </div>
}

export default function Game2048() {
  const [board, setBoard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])

  const [gameOver, setGameOver] = useState(false)

  // Initialize
  const init = () => {
    const emtpyBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
    
    addRandomTile(emtpyBoard)
    addRandomTile(emtpyBoard)

    setBoard(emtpyBoard)
  }

  //Add random value to available tiles
  const addRandomTile = (newBoard) => {
    let added = false;
    let boardIsFull = false;

    while (!added) {
      if(boardIsFull) {break}

      const rand1 = Math.floor(Math.random() * 4)
      const rand2 = Math.floor(Math.random() * 4)

      if(newBoard[rand1][rand2] === 0) {
        newBoard[rand1][rand2] = Math.random() > 0.3 ? 2 : 4
        added = true
      }
    }
  }

  // Swipe Left
  const swipeLeft = (dummy) => {
    let oldGrid = board;
    let newBoard = cloneDeep(board);

    for (let i = 0; i < 4; i++) {
      let b = newBoard[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newBoard)) {
      addRandomTile(newBoard);
    }
    if (dummy) {
      return newBoard;
    } else {
      setBoard(newBoard);
      checkAvailableMoves(newBoard)
    }
  };

  const swipeRight = (dummy) => {
    let oldData = board;
    let newBoard = cloneDeep(board);

    for (let i = 3; i >= 0; i--) {
      let b = newBoard[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(newBoard) !== JSON.stringify(oldData)) {
      addRandomTile(newBoard)
    }
    if (dummy) {
      return newBoard
    } else {
      setBoard(newBoard)
      checkAvailableMoves(newBoard)
    }
  };

  const swipeDown = (dummy) => {
    let newBoard = cloneDeep(board);
    let oldData = JSON.parse(JSON.stringify(board));
    for (let i = 3; i >= 0; i--) {
      let slow = newBoard.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (newBoard[slow][i] === 0 && newBoard[fast][i] === 0) {
          fast--;
        } else if (newBoard[slow][i] === 0 && newBoard[fast][i] !== 0) {
          newBoard[slow][i] = newBoard[fast][i];
          newBoard[fast][i] = 0;
          fast--;
        } else if (newBoard[slow][i] !== 0 && newBoard[fast][i] === 0) {
          fast--;
        } else if (newBoard[slow][i] !== 0 && newBoard[fast][i] !== 0) {
          if (newBoard[slow][i] === newBoard[fast][i]) {
            newBoard[slow][i] = newBoard[slow][i] + newBoard[fast][i];
            newBoard[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(newBoard) !== JSON.stringify(oldData)) {
      addRandomTile(newBoard)
    }
    if (dummy) {
      return newBoard
    } else {
      setBoard(newBoard)
      checkAvailableMoves(newBoard)
    }
  };

  const swipeUp = (dummy) => {
    let newBoard = cloneDeep(board);
    let oldData = JSON.parse(JSON.stringify(board));
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (newBoard[slow][i] === 0 && newBoard[fast][i] === 0) {
          fast++;
        } else if (newBoard[slow][i] === 0 && newBoard[fast][i] !== 0) {
          newBoard[slow][i] = newBoard[fast][i];
          newBoard[fast][i] = 0;
          fast++;
        } else if (newBoard[slow][i] !== 0 && newBoard[fast][i] === 0) {
          fast++;
        } else if (newBoard[slow][i] !== 0 && newBoard[fast][i] !== 0) {
          if (newBoard[slow][i] === newBoard[fast][i]) {
            newBoard[slow][i] = newBoard[slow][i] + newBoard[fast][i];
            newBoard[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(newBoard)) {
      addRandomTile(newBoard);
    }
    if (dummy) {
      return newBoard
    } else {
      setBoard(newBoard)
      checkAvailableMoves(newBoard)
    }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        swipeLeft()
        break;
      case 'ArrowRight':
        swipeRight()
        break;
      case 'ArrowUp':
        swipeUp()
        break;
      case 'ArrowDown':
        swipeDown()
        break;
      default:
        break;
    }
  }

  //Check game over

  const checkAvailableMoves = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          setGameOver(false)
          return true; 
        }
        if (j < board[i].length - 1 && board[i][j] === board[i][j + 1]) {
          setGameOver(false)
          return true; 
        }
        if (i < board.length - 1 && board[i][j] === board[i + 1][j]) {
          setGameOver(false)
          return true; 
        }
      }
    }
    setGameOver(true)
    return false;
  };
  

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (gameOver) {
      alert('Game Over!')
      init()
    }
    // eslint-disable-next-line
  }, [gameOver]);

  useEvent('keydown', handleKeyDown);

  
  return (
    <div className="gameContainer">
        <h1>2048</h1>
        <div>
          {
            board.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="row">
                  {
                    row.map((tile, tileIndex) => {
                      return (
                        <Tile key={tileIndex} value={tile}/>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
        {/* <button onClick={handleRestart}>Restart</button> */}
    </div>
  )
}
