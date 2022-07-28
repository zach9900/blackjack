 
 function drawCardAnimation(index,target){
    return(
            {
                rotateZ: 360,
                x:-700+70*index,
                y:target==='dealer'?-400:400,
            }
        )
    }



export {drawCardAnimation};
