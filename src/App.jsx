import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Route,Routes,Navigate,useNavigate} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Regester from './Regester';
import NotFound from './NotFound';
import Navbar from './Navbar';
import TvShow from './TvShow';
import MovieDetails from './MovieDetails';
import People from './People';
import Network from './Network';
import Logout from './Logout';
import About from './About';
import {jwtDecode} from 'jwt-decode';
import { useState, useEffect } from 'react';
import Movies from './Movies';


  

  function App() {

    let navigate = useNavigate();
    const [tokenData, setTokenData] = useState(null);

    function getToken(){
      let token = localStorage.getItem('userToken');
      let toKenDecode = jwtDecode (token);
      setTokenData(toKenDecode);
    }
    //logOut
    function logOut(){
      setTokenData(null);
      localStorage.removeItem('userToken');
      navigate('/login');
    }
  //refresh
    useEffect(() => {
      if(localStorage.getItem('userToken')){
        getToken();
      }
    }, []);


    function ProtectedRoute(props){
      if(localStorage.getItem('userToken') === null){
        return <Navigate to='/login'/>;
      }else{
       return props.children
      }
    }

  return (
    <div >
     <Navbar logOut={logOut} tokenData={tokenData}/>
     <Routes>
       
       <Route path='' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
       <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
       <Route path='tv' element={<ProtectedRoute><TvShow/></ProtectedRoute>}/>
       <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
       <Route path='movie' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}>
         <Route path=':id' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
       </Route>
       <Route path='people' element={<ProtectedRoute><People/></ProtectedRoute>}/>
       <Route path='about' element={<ProtectedRoute><About/></ProtectedRoute>}/>
       <Route path='network' element={<ProtectedRoute><Network/></ProtectedRoute>}/>
       <Route path='login' element={<Login getToken={getToken}/>}/>
       <Route path='rejester' element={<Regester/>}/>
       <Route path='logout' element={<ProtectedRoute><Logout/></ProtectedRoute>}/>
       <Route path='*' element={<NotFound/>}/>

     </Routes>
    </div>
  );
}

export default App;
