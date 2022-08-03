import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { styles } from "../visuals/Styles";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={styles.box}>
        <Typography sx={styles.title} variant="h1">
          black Jack
        </Typography>
        <img
          src={require("../assets/btnPlay.png")}
          alt=""
          style={styles.btnBG}
          onClick={() => navigate("/game")}
        />
      </Box>
    </div>
  );
}

export default Homepage;
