import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Params, useParams } from 'react-router-dom';

export default function TvDetail() {

    let baseImgUrl = 'https://image.tmdb.org/t/p/original/';
    const [tvDetail, setTvDetail] = useState(null)

    let params = useParams();
    async function getTvDetails() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}?api_key=f2511a52ba942787a057dbaab98cc57f&language=en-US`);
        setTvDetail(data);
    }
    useEffect(() => {
        getTvDetails()
    }, [])



    return (
        <>
            {tvDetail != null ?
                <div className='home bg-light'>
                    <div className='container pb-4 pa'>
                        <h2 className='mb-4'>Tv Show Details ...</h2>
                        <div className='row g-4'>
                            <div className='col-md-6'>
                                <div className=''>
                                    <img src={baseImgUrl + tvDetail.poster_path} className='w-100 rounded-3' alt="" />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className=''>
                                    <h1 className='text-danger'>{tvDetail.original_name}</h1>
                                    <p className='lead'>{tvDetail.overview}</p>
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
