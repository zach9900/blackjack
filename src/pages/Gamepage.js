import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from 'react';
import Card from '../components/Card'
import {styles} from '../visuals/Styles'
import { drawPlayerCardAnimation , drawDealerCardAnimation } from '../visuals/Animations'
 
function Gamepage() {

  let currentToDraw = 0;
  let showDrawnPlayerCard = useRef(false);
  let showDrawnDealerCard = useRef(false);

  const [deck, setDeck] = useState([]);

  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);

  useEffect(()=>
  {
    if(dealerHand.length === 1)
    {
       drawToPlayer();
    }

    if(dealerHand.length>0) {

      console.log('dealer: ');
    console.log(dealerHand);
    console.log(countCards(dealerHand).cardsCount)
      showDrawnDealerCard.current = true;

      if (isBlackJack(dealerHand)) {
        setScreenState('dealersTurn');
      }

      if(screenState === 'dealersTurn'){
          drawToDealer();
      }   
  }
  // eslint-disable-next-line
  },[dealerHand]);

  useEffect(()=>
  { 
    if(playerHand.length === 1 || playerHand.length === 2)
    {
      drawToDealer();
    }

    if(playerHand.length>0) {

      showDrawnPlayerCard.current = true;

    console.log('player: ');
    console.log(playerHand);
    console.log(countCards(playerHand).cardsCount)

    if (countCards(playerHand).isBusted || isBlackJack(playerHand)) {
      setScreenState('dealersTurn')
    }
  }
  // eslint-disable-next-line
  },[playerHand]);

  const [screenState, setScreenState] = useState('placeBet')

  useEffect(()=>{

    if(screenState==='dealersTurn')
    {
      drawToDealer();
    }
    // eslint-disable-next-line
  },[screenState]);

  const first = useRef(true) //in order to prevent the effect of react strict we use ref to keep alive the first var which tells us if the useEffect hasnt been executed yes

  useEffect(()=>
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

  const initCard = ()=>{ drawToPlayer(); /*deck.slice(0,4).map((card,index)=>{return drawCard(index%2===0?'player':'dealer')})*/}
  
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
    let index = currentToDraw === 0 ? playerHand.length+dealerHand.length : currentToDraw;
    if(target==='dealer' && !dealerHand.includes(deck[index]))
      {
         setDealerHand((prev)=>[...prev, deck[index]])
        currentToDraw++;
      }

    else if(target==='player'&& !playerHand.includes(deck[index]))
      { 
         setPlayerHand((prev)=>[...prev, deck[index]])
        currentToDraw++;
      }
  }

  const showCards = ()=>{
    let index =0;
    if(showDrawnPlayerCard.current){
      index =playerHand.length-1;
      showDrawnPlayerCard.current = false;
      console.log(<Card 
        key={index} 
        stl={styles.card} 
        cardImg={deck[playerHand.length+dealerHand.length-1].imgPath} 
        animation={drawPlayerCardAnimation(index)}/>);
    return (
      <Card 
        key={index} 
        stl={styles.card} 
        cardImg={deck[playerHand.length+dealerHand.length-1].imgPath} 
        animation={drawPlayerCardAnimation(index)}/>);
    }

    else if(showDrawnDealerCard.current){
      index =dealerHand.length-1;
      showDrawnDealerCard.current = false;
      console.log(<Card 
        key={index} 
        stl={index===0?styles.firstDealerCard:styles.card} 
        cardImg={index===0?'upsidedownCard':deck[playerHand.length+dealerHand.length-1].imgPath} 
        animation={drawDealerCardAnimation(index)}/>);
    return (
      <Card 
        key={index} 
        stl={index===0?styles.firstDealerCard:styles.card} 
        cardImg={index===0?'upsidedownCard':deck[playerHand.length+dealerHand.length-1].imgPath} 
        animation={drawDealerCardAnimation(index)}/>);
    }
  }

  return (
      <Box sx={styles.box}>
        
        <Card stl={styles.deck} cardImg={'upsidedownCard'} />

        {(showDrawnDealerCard|| showDrawnPlayerCard)&&showCards()}
        
        {
        (screenState==='placeBet')&&
        <img src={require('../assets/btnPlaceBet.png')} alt='' style={styles.btnPlaceBet} onClick={()=>{initCard(); setScreenState('gameStart'); }} />
        }

        {
          screenState==='gameStart' && <img src={require('../assets/btnHit.png')} alt='' style={styles.btnHit} onClick={()=>{ drawToPlayer()}} />
        }

        {
          screenState==='gameStart' && <img src={require('../assets/btnStand.png')} alt='' style={styles.btnStand} onClick={()=>{ setScreenState('dealersTurn') ; }} />
        }

        {
          screenState==='gameStart' && <img src={require('../assets/btnDouble.png')} alt='' style={styles.btnDouble} onClick={()=>{ console.log('money is doubled'); drawToPlayer(); setScreenState('dealersTurn'); }} />
        }
        
        {
          screenState==='dealersTurn' && <Card stl={styles.revealedCard} cardImg={dealerHand[0].imgPath} />
        }

        {
          screenState==='gameEnded' &&console.log(isPlayerWon() ?
          `player wins ${countCards(playerHand).cardsCount} and dealer  ${countCards(dealerHand).cardsCount} ${countCards(dealerHand).isBusted ? 'dealer busted':''}`
          :
          `dealer wins ${countCards(dealerHand).cardsCount}  and player  ${countCards(playerHand).cardsCount} ${countCards(playerHand).isBusted ? 'player busted':''}`)
        }

        {screenState==='gameEnded' && setTimeout(()=>{
          console.log('game ended'); 
          setTimeout(()=>{
            setScreenState('placeBet')
          },2000);

          },3000)}
        
      </Box>
  )
}

export default Gamepage
