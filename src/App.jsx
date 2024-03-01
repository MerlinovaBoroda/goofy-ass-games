import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"
import GamesShow from "./pages/GamesShow";
import TicTacToe from "./pages/TicTacToe/TicTacToe";
import Layout from "./Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GamesShow />} />
          <Route path="tictactoe" element={<TicTacToe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

