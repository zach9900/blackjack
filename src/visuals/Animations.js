 
 function drawPlayerCardAnimation(index){
    return(
            {
                rotateZ: 360,
                x: -700+70*index,
                y: 375,
            }
        )
    }
function drawDealerCardAnimation(index){
    return(
            {
                rotateZ: 360,
                x: -700+70*index,
                y: -375,
            }
        )
    }
export {drawPlayerCardAnimation,drawDealerCardAnimation};
