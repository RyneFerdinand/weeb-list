import React from 'react'
import './Dashboard.css'

function Dashboard(){
    return(
        <div className='container'>
            <h2 className='form-title fw-bolder mb-5'>DashBoard</h2>
            <div class="row row-cols-2 row-cols-lg-3 g-2 g-lg-4">
                <div class="col">
                    <div class="p-5 dash-col text-center fw-bolder">
                        <p>Watchlist</p>
                        <p className='col-data fs-1'>1001</p>
                    </div>
                </div>
                <div class="col">
                    <div class="p-5 dash-col text-center fw-bolder">
                        <p>Watchlist</p>
                        <p className='col-data fs-1'>1001</p>
                    </div>
                </div>
                <div class="col">
                    <div class="p-5 dash-col text-center fw-bolder">
                        <p>Watchlist</p>
                        <p className='col-data fs-1'>1001</p>
                    </div>
                </div>
                <div class="col">
                    <div class="p-5 dash-col text-center fw-bolder">
                        <p>Watchlist</p>
                        <p className='col-data fs-1'>1001</p>
                    </div>
                </div>
                <div class="col">
                    <div class="p-5 dash-col text-center fw-bolder">
                        <p>Watchlist</p>
                        <p className='col-data fs-1'>1001</p>
                    </div>
                </div>
                <div class="col">
                    <div class="p-5 dash-col text-center fw-bolder">
                        <p>Watchlist</p>
                        <p className='col-data fs-1'>1001</p>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Dashboard;