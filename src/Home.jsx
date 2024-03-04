import React from 'react'
import axios  from 'axios';
import {useEffect,useState}  from 'react';
import profile from './download.png';
import { Link } from 'react-router-dom';
export default function Home() {

   const [trendingMovies, setTrendingMovies] = useState([]) ;


   async function getTrendingMovies(){
        let responce= await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=c5aa4f1ccdf671108f7885cabe258e8b`)
         setTrendingMovies(responce.data.results.splice(0,10))
        console.log(trendingMovies)

    }
    useEffect(() => {
        getTrendingMovies();

    }, [])
    return (
        <>
        
            <div className='container pt-5'>
              <div className="row">
                <div className='col-md-4 '>
                  <h2 className='h3'>Trending <br/>movies <br/>to watch now</h2>
                  <p className='text-muted '>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                {trendingMovies.map((movie,i)=><div key={i} className='col-md-2 text-light'>
                    <div className='text-center'>
                    <Link to ={'/movie/'+movie.id}>
                    {movie.poster_path==null?<img src={profile}/>:
                        <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path}/>}
                        <h3 className='h6 pt-3 text-white'>{movie.title}</h3>
                    </Link>
                       
                    </div>
                    </div>)}
              </div>
            </div>
        </>
    )
}
