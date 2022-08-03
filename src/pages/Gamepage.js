import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from 'react';
import Card from '../components/Card'
import {styles} from '../visuals/Styles'
import { drawPlayerCardAnimation , drawDealerCardAnimation } from '../visuals/Animations'
import Typography from '@mui/material/Typography';
 
function Gamepage() {

  const [deck, setDeck] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [screenState, setScreenState] = useState('placeBet');

  useEffect(()=>//dealersHand
  {
    if(dealerHand.length === 1)
    {
       drawToPlayer();
    }

    if(dealerHand.length>0) {

      if (isBlackJack(dealerHand)) {
        setScreenState('dealersTurn');
      }

      if(screenState === 'dealersTurn'){
          drawToDealer();
      }   
  }
  // eslint-disable-next-line
  },[dealerHand]);

  useEffect(()=>//playersHand
  { 
    if(playerHand.length === 1 || playerHand.length === 2)
    {
      drawToDealer();
    }

    if(playerHand.length>0) {
      if (countCards(playerHand).isBusted || isBlackJack(playerHand)) {
        setScreenState('dealersTurn')
      }
  }
  // eslint-disable-next-line
  },[playerHand]);

  
  useEffect(()=>{//screenState

    if(screenState==='dealersTurn')
    {
      drawToDealer();
    }
    // eslint-disable-next-line
  },[screenState]);

  const first = useRef(true) //in order to prevent the effect of react strict we use ref to keep alive the first var which tells us if the useEffect hasnt been executed yes

  useEffect(()=>//fetching deck only once
  {
    if(first.current){
      first.current =false;
      getDeck();
    }
  },[]);

  const getDeck = async () =>{
      const res = await fetch('http://localhost:5000/deck/shuffled');
      const data = await res.json();
      setDeck(data);
  }
  
  const countCards = (hand)=>{
    let res=0;
    return {"cardsCount":hand.map(({suit,number,imgPath})=>{ return number })
    .sort((a, b) => b-a)
    .map((value)=>{
      if(value ===1 && res+11 <= 21)
        res +=11;
      else 
        res+=value;

      return res  
    })[hand.length-1], "isBusted": res<=21 ? false:true};
  }

  const isBlackJack = (hand)=>{
    return hand.length === 2 && countCards(hand).cardsCount === 21
  }

 const isPlayerWon= ()=>{
    isBlackJack(playerHand) && console.log("BLACK JACK !");
    return (isBlackJack(playerHand) ||
     (!countCards(playerHand).isBusted && countCards(dealerHand).isBusted) ||
      (countCards(playerHand).cardsCount>=countCards(dealerHand).cardsCount && !countCards(playerHand).isBusted))
  }

 const drawToDealer = ()=>{
  if(dealerHand.length===0 || countCards(dealerHand).cardsCount<17)
    drawCard('dealer')
  else
    setScreenState('gameEnded');  
  }

  const drawToPlayer = ()=>{  
        drawCard('player')  
      }

  const drawCard = (target) =>
  {
    let index =  playerHand.length+dealerHand.length;

    if(target==='dealer' && !dealerHand.includes(deck[index]))
      {
         setDealerHand((prev)=>[...prev, deck[index]])
      }

    else if(target==='player'&& !playerHand.includes(deck[index]))
      { 
         setPlayerHand((prev)=>[...prev, deck[index]])
      }
  }

  const resetGame = ()=>{
    setScreenState('placeBet');
    getDeck();
    setDealerHand([]);
    setPlayerHand([]);
  }

  const getEndPrompt = (targetHand)=>{
    let prompt = ''
      if(isBlackJack(targetHand))
        prompt= 'BlackJack'

      else if (countCards(targetHand).cardsCount > 21)
        prompt = 'Bust'

      else prompt = countCards(targetHand).cardsCount  

    return prompt;
  }

  return (
      <Box sx={styles.box}>
        
        <Card stl={styles.deck} cardImg={'upsidedownCard'} />

        {
        (screenState==='placeBet')&&
        <img src={require('../assets/btnPlaceBet.png')} alt='' style={styles.btnPlaceBet} onClick={()=>{drawToPlayer(); setScreenState('gameStart'); }} />
        }

        {
          screenState==='gameStart' && <img src={require('../assets/btnHit.png')} alt='' style={styles.btnHit} onClick={()=>{ drawToPlayer()}} />
        }

        {
          screenState==='gameStart' && <img src={require('../assets/btnStand.png')} alt='' style={styles.btnStand} onClick={()=>{ setScreenState('dealersTurn') }} />
        }

        {
          (screenState==='gameStart' && playerHand.length<=2) && <img src={require('../assets/btnDouble.png')} alt='' style={styles.btnDouble} onClick={()=>{ console.log('money is doubled'); drawToPlayer(); setScreenState('dealersTurn'); setTimeout(()=>{},500) }} />
        }

        { (screenState!=='placeBet') && 
          <Typography 
          sx={styles.dealersCounter}
          variant='h2'> 
          {getEndPrompt(dealerHand)}
          </Typography>
        } 

        { (screenState!=='placeBet') && 
          <Typography 
          sx={styles.playersCounter}
          variant='h2'> 
          {getEndPrompt(playerHand)}
          </Typography>
        }

        { (screenState!=='placeBet') && playerHand.map((value, index)=>{
          return <Card 
          key={index} 
          stl={styles.card} 
          cardImg={value.imgPath} 
          animation={drawPlayerCardAnimation(index)}/>
        })} 

        { (screenState!=='placeBet') && dealerHand.map((value, index)=>{
          return <Card 
          key={index} 
          stl={index===0  ? styles.firstDealerCard:styles.card} 
          cardImg={(index===0 && screenState==='gameStart')?'upsidedownCard':value.imgPath} 
          animation={drawDealerCardAnimation(index)}/>
        })} 

        {
          screenState==='gameEnded' &&
          <Typography 
          sx={styles.results}
          variant='h2'> 
          {isPlayerWon() ?
          `player wins ${isBlackJack(playerHand)?'BlackJack':countCards(playerHand).cardsCount}`
          :
          `dealer wins ${isBlackJack(dealerHand)?'BlackJack':countCards(dealerHand).cardsCount}`}
        </Typography>
        }

        {screenState==='gameEnded' && setTimeout(()=>{
          setTimeout(()=>{
            resetGame();
          },2000);
          },3000)}
        
      </Box>
  )
}

export default Gamepage
