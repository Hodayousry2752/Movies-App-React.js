import React,{useContext}  from 'react';
import profile from './download.png';
import { Link } from 'react-router-dom';
import {contextMovies} from './Store.js';

export default function Home() {

 let {trendingMovies} = useContext(contextMovies);
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
