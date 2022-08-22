import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { spot } from '../../store/spots'
import './Spots.css'

function DisplaySpots() {

    const dispatch = useDispatch()
    const properties = useSelector(state =>
        // console.log(state.spotsReducer)
        Object.values(state.spotsReducer)
    )
    console.log(properties)
    useEffect(() => {
        dispatch(spot())
    }, [dispatch])

    if (!properties) return null

    return (
        <div className='allSpot-container'>
            <div className='spot-whole-container'>
                {properties.map(({ id, city, price, state, }) => (
                    <div className='location-container'>
                        <h1 className='location-image'>Image here</h1>

                        <div className='location-details'>
                            <div key={id} className='location'>
                                {`${city}, ${state}`}
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
