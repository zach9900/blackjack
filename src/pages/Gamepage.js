import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from 'react';
import Card from '../components/Card'
import {styles} from '../visuals/Styles'
import { drawCardAnimation  } from '../visuals/Animations'
 
function Gamepage() {

  const [deck, setDeck] = useState([]);
  let dealerHand=[];
  let playerHand=[];

  const [screenState, setScreenState] = useState('placeBet')

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
  
  const drawCard = (target) =>
  {
    let index = dealerHand.length + playerHand.length;

    if(deck[index]&& target==='dealer' && !dealerHand.includes(deck[index]))
      {
        dealerHand.push(deck[index])
        //console.log(`dealer hand ${dealerHand}`);
      }

    else if(deck[index]&& target==='player'&& !playerHand.includes(deck[index]))
      { 
        playerHand.push(deck[index]);
        //console.log(`player hand ${playerHand}`);
        }

    return deck[index]&& 
    <Card 
    key={index} 
    stl={styles.card} 
    cardImg={( target==='dealer'&&dealerHand.length===1)?'upsidedownCard':deck[index].imgPath} 
    animation={drawCardAnimation(target==='dealer'?dealerHand.length-1:playerHand.length-1,target)}/>;
  }

  const initCard = ()=>{return deck.map((card,index)=>{return index<4 && drawCard(index%2===0?'player':'dealer')})}
  
  const countCards = (hand)=>{
    let res=0;
    return {"cardsCount":hand.map(({suit,number,imgPath})=>{ return number }).sort((a, b) => b-a).map((value)=>{
      if(value ===1 && res+11 <= 21)
        res +=11;
      else 
        res+=value;

      return res  
    })[hand.length-1], "isBusted": res<=21 ? false:true};
  }

  return (
    <div>
      <Box sx={styles.box}>
        {/*TODO try to make a delay and start working on the logic 
        
        playing mode will be 4 buttons stand ,hit, 
        double (if below 11 whice auto draw one and end turn), 
        split (which split hand to two hands and let the play same options again), 
        after player hand ended (busted 21 stand) screen state will be changed to dealrsTurn
        */}

        <Card stl={styles.deck} cardImg={'upsidedownCard'} />
        {
        (screenState==='placeBet')?
        
        <img src={require('../assets/btnPlaceBet.png')} alt='' style={styles.btnPlaceBet} onClick={()=>setScreenState('gameStart')} />
          :initCard()
        }
        {screenState === 'gameStart'  &&  drawCard('player')}

        {
          screenState==='gameStart' && <img src={require('../assets/btnStand.png')} alt='' style={styles.btnDillersTurn} onClick={()=>{ drawCard('player');setScreenState('dilearsTurn')}} />
        }
  
        {screenState === 'gameStart' && console.log(countCards(playerHand))}

        {
          screenState==='dilearsTurn' && <Card stl={styles.revealedCard} cardImg={dealerHand[0].imgPath} />
        }

        {
          screenState==='dilearsTurn' &&console.log(countCards(dealerHand))
        }

        {
          screenState==='dilearsTurn' &&console.log(countCards(dealerHand).cardsCount>countCards(playerHand).cardsCount || countCards(playerHand).isBusted ?'dealer wins':'player wins')
        }
        
        
      </Box>
    </div>
  )
}

export default Gamepage
