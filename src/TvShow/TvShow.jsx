import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Home() {

  const [tvShows, setTvShows] = useState([]);
  let baseImgUrl = 'https://image.tmdb.org/t/p/original/';

  async function getTvShow() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=f2511a52ba942787a057dbaab98cc57f`);
    setTvShows(data.results);
  }

  useEffect(() => {
    getTvShow();
  }, [])


  return (
    <>
      {tvShows.length != 0 ?
        <div className='home bg-light'>
          <div className='container pb-4 pa'>
            <h2 className='mb-4'>Tv Shows ...</h2> <div className='row g-4'>
              {tvShows.map((tvShow, index) =>
                <div key={index} className='col-md-3 col-sm-6 overFlow-hidden'>
                  <div className='item shadow'>
                    <Link to={`/tvDetail/${tvShow.id} `}>
                      <img src={baseImgUrl + tvShow.poster_path} className='w-100' alt="" />
                      <div className='p-1'>
                        <i className="fas fa-star text-warning ms-2"></i>
                        <p className='text-white d-inline-block mb-0 ms-2 fw-bold'>{tvShow.vote_average}</p>
                      </div>
                      <div className='layer text-white'>
                        <h6 className='mt-4 fw-bold text-center'>{tvShow.name}</h6>
                      </div>
                    </Link>
                  </div>
                </div>)}
            </div>
          </div>
        </div> :
        <div className='wait'>
          <i className="fas fa-spinner fa-spin"></i>
        </div>}
    </>
  )
}


