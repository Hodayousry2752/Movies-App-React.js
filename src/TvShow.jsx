import React ,{useContext}  from 'react';
import {contextMovies} from './Store.js';
import { Link } from 'react-router-dom';
import profile from './download.png';

export default function TvShow() {
    let {trendingTv}=useContext(contextMovies);
    return (

        <div className=''>
            <div className='container py-5'>
                   <div className="row justify-content-center">
                    {trendingTv.map((pageMovie,i)=><div key={i} className='text-center col-md-4 pb-3'>
                        <Link to ={'/movie/'+pageMovie.id}>
                        {pageMovie.backdrop_path==null?<img src={profile}/>:
                            <img className='w-75' src={'https://image.tmdb.org/t/p/w500'+pageMovie.backdrop_path}/>}
                            <h3 className='h6 pt-3 text-white'>{pageMovie.name}</h3>
                        </Link>
                        </div>)
                        }
                    </div>
            </div>
            <nav aria-label="..." className='d-flex justify-content-center'>
                <ul className="pagination pagination-sm text-center">
                    
                </ul>
            </nav>
        </div>
    )
}
