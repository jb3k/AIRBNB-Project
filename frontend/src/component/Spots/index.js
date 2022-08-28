import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getSpotById, spot } from '../../store/spots'
import './Spots.css'

function DisplaySpots() {

    const dispatch = useDispatch()
    const { spotId } = useParams()

    const properties = useSelector(state =>
        // console.log(state.spotsReducer)
        Object.values(state.spots)
    )
    // console.log(properties)

    console.log(spotId)
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
                            <div>
                                <i className='icon-font' class="fa-solid fa-star fa-s">{decimal(avgRating)}</i>

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
        <div className='allSpot-container'>
            <div className='spot-whole-container'>
                {mainPage}
            </div>

        </div>

    )
}

export default DisplaySpots
