import React from 'react'
import "./GamesShow.css"


export default function GamesShow() {

    const games = {
        "tictactoe": {
            "title": "TicTacToe",
            "description": "Very simple Tic Tac Toe game",
            "image": "https://miro.medium.com/v2/resize:fit:640/format:webp/1*9LBDOx6gG4mTuPGPDp888w.png",
            "url": "/tictactoe"
        },
        "2048": {
            "title": "2048 - to be created...",
            "description": "Very simple 2048 game",
            "image": "",
            "url": "/2048"
        },
    }

  return (
    <div className='box'>
        {Object.keys(games).map((key) => {
            const game = games[key];
            return (
                <div className='card' key={key}>
                    <h2>{game.title}</h2>
                    <p>{game.description}</p>
                    <img src={game.image} alt={game.title} />
                    <a href={game.url}>
                        <button>Play {game.title}</button>
                    </a>
                </div>
            );
        })}
    </div>
  )
}
