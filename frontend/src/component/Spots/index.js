import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { spot } from '../../store/spots'
import './Spots.css'

function DisplaySpots() {

    const dispatch = useDispatch()
    const { spotId } = useParams()

    const properties = useSelector(state =>
        // console.log(state.spotsReducer)
        Object.values(state.spotsReducer)
    )
    // console.log(properties)

    useEffect(() => {
        dispatch(spot())
    }, [dispatch])

    if (!properties) return null

    return (
        <div className='allSpot-container'>
            <div className='spot-whole-container'>
                {properties.map(({ id, city, price, state, avgRating, previewImage }) => (
                    <div className='location-container'>
                        {/* <NavLink to={''}></NavLink> */}
                        <div className='location-image'>
                            <img src={previewImage} className='image'></img>
                        </div>
                        <div className='location-details'>
                            <div key={id} className='location'>
                                {`${city}, ${state}`}
                                <i class="fa-solid fa-star"></i>
                                {Math.round(avgRating * 100) / 100}
                            </div>
                            <div key={id} className='location-price'>
                                {`$${Math.floor(price)} night`}
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>

    )
}

export default DisplaySpots
