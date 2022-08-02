export const styles ={
    box:
      {
        background: 'linear-gradient(10deg, #006600 30%, #003300 70%)',
        height: '100vh',
        width: '100vh',
        margin: 'auto',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
      },

    title:
    {
      marginTop: '20vh',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontFamily: "Algerian",
      color: 'gold'
    },

    btnBG:
    {
      position:'relative',
      width: 300,
      height: 100,
      zIndex: 8,
      margin: 'auto',
    },

    deallerside:
    {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 125, 
      marginBottom: 50,
      position:'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
    },

    playerside:
    {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 50,
      position:'relative',
      marginRight: 'auto',
      marginLeft: 'auto',
    },

    deck:
    {
      position: 'absolute', 
      zIndex: 1,
      marginLeft: 1070,
      marginTop:500
    },

    card:
    {
      position: 'absolute',  
      zIndex: 3,
      marginLeft: 1070,
      marginTop:500
    },

    btnPlaceBet:
    {
      position:'relative',
      width: 350,
      height: 90,
      zIndex: 2,
      marginTop: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 100,
    },

    btnStand:
    {
      position:'relative',
      width: 350,
      height: 100,
      zIndex: 2,
      marginTop: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 10,
    },

    btnHit:
    {
      position:'absolute',
      width: 225,
      height: 100,
      zIndex: 2,
      marginTop: 1187,
      marginLeft: 910,
    },

    btnDouble:
    {
      position:'absolute',
      width: 350,
      height: 100,
      zIndex: 2,
      marginTop: 1187,
      marginLeft: 75,
    },

    revealedCard:
    {
      position: 'absolute',  
      zIndex: 2,
      marginLeft: 370,
      marginTop:125,
    },

    firstDealerCard:
    {
      position: 'absolute',  
      zIndex: 1,
      marginLeft: 1070,
      marginTop:500
    },


  };