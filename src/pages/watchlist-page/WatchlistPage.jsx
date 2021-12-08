function HomePage(){
    return (
        <div>
            <div className="title">
                <span className="first-title">My </span>
                <span className="second-title">Watchlist</span>
            </div>
            <div className="watchlist">
                <div className="watchlist-header">
                    <div>Title</div>
                    <div>Status</div>
                    <div>My Rating</div>
                    <div className="watchlist-delete"></div>
                </div>
                <div className="watchlist-content">
                    <div className="watchlist-title">
                        <img src="https://picsum.photos/200/300"></img>
                        <div>
                            &nbsp; Boruto: Naruto Next Generations
                        </div>
                    </div>
                    <div className="watchlist-status">
                        Finished
                    </div>
                    <div className="watchlist-status">
                        <i class="fas fa-plus"></i>&nbsp;Add Rating
                    </div>
                    <div className="watchlist-delete">
                    <   button className="delete"><i class="far fa-trash-alt"></i></button>
                    </div>
                </div>
                <div className="watchlist-content">
                    <div className="watchlist-title">
                        <img src="https://picsum.photos/200/300"></img>
                        <div>
                            &nbsp; Takt Op. Destiny
                        </div>
                    </div>
                    <div className="watchlist-status">
                        Watching
                    </div>
                    <div className="watchlist-status">
                        <i class="fas fa-star"></i>&nbsp;8.5
                    </div>
                    <div className="watchlist-delete">
                    <   button className="delete"><i class="far fa-trash-alt"></i></button>
                    </div>
                </div>
                <div className="watchlist-content">
                    <div className="watchlist-title">
                        <img src="https://picsum.photos/200/300"></img>
                        <div>
                            &nbsp; Kimetsu no Yaiba: Mugen Ressha-hen
                        </div>
                    </div>
                    <div className="watchlist-status">
                        Planned
                    </div>
                    <div className="watchlist-status">
                        <i class="fas fa-plus"></i>&nbsp;Add Rating
                    </div>
                    <div className="watchlist-delete">
                    <   button className="delete"><i class="far fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage