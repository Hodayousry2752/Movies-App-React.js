import React, {useState,useEffect}  from 'react';
import profile from './download.png';
import { Link } from 'react-router-dom';
import axios  from 'axios';


export default function Movies() {
    const [pageMovies, setPageMovies] = useState([]) ;
    let nums = new Array(13).fill(1).map((element,index)=>index+1)
    async function getPageMovies(pageNum){
        let responce= await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=c5aa4f1ccdf671108f7885cabe258e8b&language=en-us&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`)
        setPageMovies(responce.data.results);
    }
    useEffect(()=>{
        getPageMovies(1)

    },[])
    return (

        <div className=''>
            <div className='container py-5'>
                   <div className="row justify-content-center">
                    {pageMovies?pageMovies.map((pageMovie,i)=><div key={i} className='text-center col-md-4 pb-3'>
                        <Link to ={'/movie/'+pageMovie.id}>
                        {pageMovie.poster_path==null?<img src={profile}/>:
                            <img className='w-75' src={'https://image.tmdb.org/t/p/w500'+pageMovie.poster_path}/>}
                            <h3 className='h6 pt-3 text-white'>{pageMovie.title}</h3>
                        </Link>
                        </div>):<i className='fas fa-spin fa-spinner'></i>}
                    </div>
            </div>
            <nav aria-label="..." className='d-flex justify-content-center'>
                <ul class="pagination pagination-sm text-center">
                {nums.map((parm)=> <li onClick={()=>getPageMovies(parm)} key={parm} class="page-item"><a class="page-link bg-transparent text-white">{parm}</a></li>
)}
                    
                </ul>
            </nav>
        </div>
    )
}
