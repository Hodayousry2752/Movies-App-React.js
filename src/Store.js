import React, {createContext,useState,useEffect} from 'react';
import axios  from 'axios';

export let contextMovies = createContext(0);

export default function MoviesContextProvider(props){
    const [trendingMovies, setTrendingMovies] = useState([]) ;
    const [trendingPeople, setTrendingPeople] = useState([]) ;
    const [trendingTv, setTrendingTv] = useState([]) ;

 
    async function getTrending(trend,callback){
         let responce= await axios.get(`https://api.themoviedb.org/3/trending/${trend}/day?api_key=c5aa4f1ccdf671108f7885cabe258e8b`)
          callback(responce.data.results.splice(0,10)) 
     }
   
     useEffect(() => {
        getTrending('movie',setTrendingMovies);
         getTrending('person',setTrendingPeople);
         getTrending('tv',setTrendingTv);

     }, [])
    return <contextMovies.Provider value={{trendingMovies,trendingPeople,trendingTv,getTrending}}>
             {props.children}
           </contextMovies.Provider>
}
