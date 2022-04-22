import React from 'react'
import SearchBar from "../../components/Search"
import './index.scss'

export default function Hero({searchQuery, setSearchQuery, searchedResaults}: any) {

    return <div className="hero-section">
        <div className="container hero-section__inner f c ac">
            <h1 className="m-t-0 m-b-2">👋 Hello there</h1>
            <div className="full-w">
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    posts={searchedResaults}/>
            </div>
            <div className="m-t-2" style={{textAlign: 'center'}}>
                <span className="m-r-1">Popular:</span>
                <span className="hero-popular-search m-r-05" onClick={() => setSearchQuery('How to provide liquidity')}>How to provide liquidity?</span>
                <span className="hero-popular-search m-r-05" onClick={() => setSearchQuery('Staking')}>Staking</span>
                <span className="hero-popular-search" onClick={() => setSearchQuery('Farming')}>Farming</span>
            </div>
        </div>
    </div>
}