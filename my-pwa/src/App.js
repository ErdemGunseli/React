/* To create the React PWA, run the following command from the terminal:
npx create-react-app my-pwa --template cra-template-pwa

We will be using FireBase for this project because it is a great platform for hosting PWAs 
and provides HTTPS certification which is required for PWAs.

Install the FireBase CLI globally by running the following command:
npm install -g firebase-tools

Then, navigate to the application directory and run the following command:
firebase login

This will open a browser window and ask you to login to your FireBase account.

Then run the following command to initialize the FireBase project:
firebase init hosting

To run the app, use the following commands:
npm run build
firebase deploy
*/

import { useState, useEffect } from 'react';
import shuffle from './utilities/shuffle';
import Card from './components/Card';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';

function App() {
  const [cards, setCards] = useState(shuffle); // An array of cards from assets
  const [pickOne, setPickOne] = useState(null); // The first card picked
  const [pickTwo, setPickTwo] = useState(null); // The second card picked

  // When determining if the 2 cards match, we want to add a slight delay and disable the cards:
  const [disabled, setDisabled] = useState(false); // Disable the cards when 2 are picked

  const [wins, setWins] = useState(0); // Number of wins


  // Handling card selection:
  function handleClick(card) {
    if (!disabled) {
      // syntax: condition ? value if true : value if false
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };


  function handleTurn() {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  function handleNewGame() {
    setWins(0);
    handleTurn();
    setCards(shuffle());
  }

  // Used for selection and match handling:
  useEffect(() => {
    let pickTimer;

    //Two cards have been clicked:
    if (pickOne && pickTwo) {
      // Checking if the cards match by comparing their images:
      if (pickOne.image === pickTwo.image) {
        // If they match, set the matched property to true:
        setCards((prev) => {
          return prev.map((card) => {
            if (card.image === pickOne.image) {
              return {...card, matched: true}
            } else {
              // If no match, just returning the card.
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // If the cards don't match, set a timer to flip them back over:
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
      return () => {clearTimeout(pickTimer);};
    };
  }, [cards, pickOne, pickTwo]);


  // Used for win handling:
  useEffect(() => {
    const checkWin = cards.filter((card) => !card.matched);
    console.log("TEEESSSTTT")

    if (cards.length && checkWin.length < 1) {
      setWins(wins + 1);
      handleTurn();
      setCards(shuffle());

    }
  }, [cards, wins]);

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />
      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;
          
          return (<Card key={id} image={image}  selected={card === pickOne || card === pickTwo || matched}
            onClick={() => {handleClick(card)}}
        />);
        })}
      </div>
    </>
  );
}

export default App;
