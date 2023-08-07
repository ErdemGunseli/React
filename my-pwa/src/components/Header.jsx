import { useEffect } from "react";

export default function Header({ handleNewGame, wins}) {

useEffect(() => (document.title= `${wins} wins`), [wins]);

return (
    <header className="header">
        <h4>You have {wins} wins</h4>
        <h3>Mind Game</h3>
        <button onClick={handleNewGame}>New Game</button>
    </header>
);
};