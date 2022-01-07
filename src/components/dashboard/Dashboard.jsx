import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import Axios from 'axios'

function Dashboard(){
    const [watchlist, setWatchlist] = useState(0)
    const [finished, setFinished] = useState(0)
    const [watching, setWatching] = useState(0)
    const [planned, setPlanned] = useState(0)
    const [review, setReview] = useState(0)
    const [weebScale, setWeebScale] = useState("")
    useEffect(() => {
        Axios.get('http://localhost:8080/dashboard').then((response) => {
            setWatchlist(response.data.watchlist)
            setFinished(response.data.finished)
            setWatching(response.data.watching)
            setPlanned(response.data.planned)
            setReview(response.data.review)
        })
    }, [])

    return(
        <div className='container'>
            <h2 className='form-title fw-bolder mb-5' style={{ overflowY: "hidden" }}>DashBoard</h2>
            <div class="row row-cols-2 row-cols-lg-3 g-2 g-lg-4">
                <div class="col">
                    <div class="p-5 dash-col text-center fw-bolder">
                        <p>Watchlist</p>
                        <p className='col-data fs-1'>{watchlist}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="p-5 dash-col text-center fw-bolder">
                        <p>Finished</p>
                        <p className='col-data fs-1'>{finished}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="p-5 dash-col text-center fw-bolder">
                        <p>Watching</p>
                        <p className='col-data fs-1'>{watching}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="p-5 dash-col text-center fw-bolder">
                        <p>Plan-to-watch</p>
                        <p className='col-data fs-1'>{planned}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="p-5 dash-col text-center fw-bolder">
                        <p>Total Review</p>
                        <p className='col-data fs-1'>{review}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="p-5 dash-col text-center fw-bolder">
                        <p>Weeb Scale</p>
                        <p className='col-data fs-1'>{review}</p>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Dashboard;