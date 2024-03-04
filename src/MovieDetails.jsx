import React from 'react'
import { useParams } from 'react-router';
import axios  from 'axios';
import {useEffect,useState}  from 'react';

export default function Movie() {
    let param =useParams();

    const [thisMovie, setThisMovie] = useState({}) ;
    async function getMovie(id){
        let responce= await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c5aa4f1ccdf671108f7885cabe258e8b`)
        setThisMovie(responce.data);
    }
    useEffect(()=>{
        getMovie(param.id)

    },[])
    return (
        <div className='text-white'>
           <div className = 'container'>
           {thisMovie?
              <div className ='row pt-5'>
                <div className='col-md-4'>
                   <img className='h-75' src={'https://image.tmdb.org/t/p/w500'+thisMovie.poster_path}/>
                </div>
                <div className='col-md-7'>
                     <h3 >{thisMovie.original_title}</h3>
                     <p className='py-5'>{thisMovie.overview}</p>
                     <ul>
                         <li>{'budget : '+thisMovie.budget}</li>
                         <li>{'vote : '+thisMovie.vote_average}</li>
                         <li>{'popularity : '+thisMovie.popularity}</li>
                         <li>{'vote-count : '+thisMovie.vote_count}</li>

                     </ul>
                </div>
              </div>:<i className='fas fa-spin fa-spinner'></i>}

           </div>
        </div>
    )
}

//https://api.themoviedb.org/3/movie/507086?api_key=c5aa4f1ccdf671108f7885cabe258e8b