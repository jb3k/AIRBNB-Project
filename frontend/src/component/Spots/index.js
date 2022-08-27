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
    console.log(properties)

    useEffect(() => {
        dispatch(spot())
    }, [dispatch])

    if (!properties) return null

    return (
        <div className='allSpot-container'>
            <div className='spot-whole-container'>
                {properties.map(({ id, city, price, state, avgRating, previewImage }) => (
                    <div key={id} className='location-container'>
                        <NavLink className={'redirect'} to={`/spots/${id}`}>
                            <div className='location-image'>
                                <img src={previewImage} className='image'></img>
                            </div>
                            <div className='location-details'>
                                <div className='location'>
                                    <div>
                                        {`${city}, ${state}`}
                                    </div>
                                    <div>
                                        <i className='icon-font' class="fa-solid fa-star fa-s">{Math.round(avgRating * 100) / 100}</i>
                                        
                                    </div>
                                </div>
                                <div className='location-price'>
                                    {`$${Math.floor(price)} night`}
                                </div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>

        </div>

    )
}

export default DisplaySpots
