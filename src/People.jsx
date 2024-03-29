import React from 'react'
import {useContext}  from 'react';
import profile from './download.png';
import { Link } from 'react-router-dom';
import {contextMovies} from './Store.js';


export default function People() {
    let {trendingPeople}=useContext(contextMovies);
    return (

        <div className=''>
            <div className='container py-5'>
                   <div className="row justify-content-center">
                    {trendingPeople.map((pageMovie,i)=><div key={i} className='text-center col-md-4 pb-3'>
                        <Link to ={'/movie/'+pageMovie.id}>
                        {pageMovie.profile_path==null?<img src={profile}/>:
                            <img className='w-75' src={'https://image.tmdb.org/t/p/w500'+pageMovie.profile_path}/>}
                            <h3 className='h6 pt-3 text-white'>{pageMovie.name}</h3>
                        </Link>
                        </div>)
                        }
                    </div>
            </div>
            <nav aria-label="..." className='d-flex justify-content-center'>
                <ul className="pagination pagination-sm text-center">
                {/* {nums.map((parm)=> <li onClick={()=>getTrending(parm)} key={parm} class="page-item"><a className="page-link bg-transparent text-white">{parm}</a></li> */}
)}
                    
                </ul>
            </nav>
        </div>
    )
}
