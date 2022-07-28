import { motion } from "framer-motion";

const Card = ({stl,cardImg,animation}) => {
  
  return (
    <div style={stl}>
      <motion.img src={require(`../assets/cards/${cardImg}.png`)} width={200} height={300} alt='' animate={animation} transition={{ duration: 0.6}}/>
      
    </div>
  )
}

export default Card
