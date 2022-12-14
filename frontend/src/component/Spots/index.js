import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { spot } from '../../store/spots'
import './Spots.css'
import Footer from '../Footer/footer'

function DisplaySpots() {

    const dispatch = useDispatch()
    // const { spotId } = useParams()

    const properties = useSelector(state =>
        // console.log(state.spotsReducer)
        Object.values(state.spots)
    )
    // console.log(properties)

    useEffect(() => {
        dispatch(spot())
        // dispatch(getSpotById())
    }, [dispatch])

    if (!properties) return null

    const decimal = (num) => {
        if (num <= 0) return
        return Number.parseFloat(num).toFixed(2)
    }


    const mainPage = properties.map((spot) => {
        if (!spot) return null
        const { id, city, price, state, avgRating, previewImage } = spot

        return (
            <div key={spot?.id} className='location-container'>
                <NavLink className={'redirect'} to={`/spots/${id}`} style={{ color: 'black', fontWeight: 'normal' }}>
                    <div className='location-image'>
                        <img src={previewImage} className='image'></img>
                    </div>
                    <div className='location-details'>
                        <div className='location'>
                            <div>
                                {`${city}, ${state}`}
                            </div>
                            <div className='mainpage-icon-ratings'>
                                {avgRating > 0 ? <i className='icon-font' class="fa-solid fa-star">{decimal(avgRating)}</i> : <i className='icon-font' class="fa-solid fa-star">0.00</i>}
                            </div>
                        </div>
                        <div className='location-price'>
                            {`$${Math.floor(price)} night`}
                        </div>
                    </div>
                </NavLink>
            </div>
        )
    })



    return (
        <>
            <div className='navbar-spacer'> </div>
            <div className='allSpot-container'>
                <div className='spot-whole-container'>
                    {mainPage}
                </div>
            </div>
            <Footer />

        </>

    )
}

export default DisplaySpots
