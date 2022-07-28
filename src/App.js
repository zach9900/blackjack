import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import Gamepage from './pages/Gamepage'
import Errorpage from './pages/Errorpage';


export default function App() {

  return (
    <BrowserRouter> 
      <div style={{background:"#666666"}}>
      <Routes >

        <Route path= '/' element={<Homepage />}/>

        <Route path= '/game' element={<Gamepage />}/>

        <Route path= '*' element={<Errorpage />}/>

      </Routes>
      </div>

    </BrowserRouter>   
  );
}

