import { useState } from "react"
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import './SearchBar.css'

const SearchBar = () => {

    const history = useHistory()
    const allSpots = useSelector(state => state.search)
    const [filterSpots, setFilterSpots] = useState([])
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        const spotSearch = e.target.value
        setSearch(spotSearch)
        const findSpot = Object.values(allSpots).filter(spot => {
            return ((spot.address.toLowerCase().includes(spotSearch.toLowerCase())) || spot.name.toLowerCase().includes(spotSearch.toLowerCase()))
        })
        spotSearch === '' ? setFilterSpots([]) : setFilterSpots(findSpot)

    }
    const handleSubmit = () => {
        history.push(`/spots/${filterSpots[0].id}`)
        setFilterSpots([])
        setSearch('')
    }
    const clearSearch = () => {
        setFilterSpots([])
        setSearch('')
    }

    return (
        <div className='search-bar-container'>
            <form className="search-bar-input-container"
                onSubmit={handleSubmit}>
                <input
                    className='search-bar-input'
                    type='text'
                    value={search}
                    onChange={handleSearch}
                    placeholder='Anywhere | Any week | Add Guests'
                />
            </form>
            <div>
                {search.length !== 0 ? <button className="clear-button" onClick={clearSearch}>X</button> : <button className="clear-button" ></button>}
            </div>
            <div className='spot-search-results'>
                {
                    filterSpots.slice(0, 5).map((spots, idx) => (
                        <NavLink to={`/spots/${spots.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <div className='dropdown-searchbar-results' key={idx} onClick={clearSearch} >
                                <div className='searchbar-image-container'>
                                    <img src={spots.previewImage} alt='spots' className="searchbar-image"></img>
                                </div>
                                <div className="searchbar-text-container">
                                    <div>{spots.name}</div>
                                    <div>{spots.address}</div>
                                </div>
                            </div>
                        </NavLink>
                    ))
                }
            </div >
        </div >
    )
}

export default SearchBar
