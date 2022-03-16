import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Params, useParams } from 'react-router-dom';

export default function MovieDetail() {

    let baseImgUrl = 'https://image.tmdb.org/t/p/original/';
    const [movie, setMovie] = useState(null)

    let params = useParams();
    async function getMovieDetails() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=f2511a52ba942787a057dbaab98cc57f&language=en-US`);
        setMovie(data);
    }
    useEffect(() => {
        getMovieDetails()
    }, [])



    return (
        <>
            {movie != null ?
                <div className='home bg-light'>
                    <div className='container pb-4 pa'>
                        <h2 className='mb-4'>Movie Details ...</h2>
                        <div className='row g-4'>
                            <div className='col-md-6'>
                                <div className=''>
                                    <img src={baseImgUrl + movie.poster_path} className='w-100 rounded-3' alt="" />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className=''>
                                    <h1 className='text-danger'>{movie.original_title}</h1>
                                    <p className='lead'>{movie.overview}</p>
                                    <h4 className='text-warning'>{movie.release_date}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                <div className='wait'>
                    <i className="fas fa-spinner fa-spin"></i>
                </div>}
        </>
    )
}
