import './App.css';
import{Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Rooms  from './components/Rooms';
import Notfound from './components/Notfound';
import RoomDetail from './components/RoomDetail'
import Login from './components/Login';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { HashLoader } from 'react-spinners';



function App() {
  return (
  <>
  <ResponsiveAppBar/>
  <Routes>
      <Route path='/' exact  element={<Home/>} ></Route>
      <Route path='/register' element={<Register/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/rooms' element={<Rooms/>} ></Route>
      <Route path='/book/:id/:toDate/:fromDate' element={<RoomDetail/>} ></Route>
      <Route path='*' element={<Notfound/>} ></Route>
  </Routes>

  </>
  );
}

export default App;
