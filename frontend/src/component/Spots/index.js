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
        <div className='spot-container'>
            {properties.map(({ id, city, price, state, }) => (
                <div key={id} className='location'> {`${city}, ${state} $${Math.floor(price)} night`}</div>
            ))}
        </div>

    )
}

export default DisplaySpots
