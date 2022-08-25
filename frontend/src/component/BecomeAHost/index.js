import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { deleteLocation, getCurrentUserSpot } from '../../store/spots'
import './BecomeHost.css'

function BecomeHost() {

    const dispatch = useDispatch()


    // take a look at state and return something from it from the reducer
    const userSpots = useSelector((state) => Object.values(state.spots))
    // console.log(userSpots)

    useEffect(() => {
        dispatch(getCurrentUserSpot())
    }, [dispatch])

    if (!userSpots) return null

    return (
        <div className='whole-page'>
            <div>
                <NavLink to='/spots/create'>
                    <button> Add a Spot </button>
                </NavLink>
            </div>
            <div className='spot-whole-container'>
                {userSpots.map(({ id, city, price, state, }) => (
                        <div key={id} className='location-container'>
                            <NavLink to={`/spots/${id}`}>
                                <div className='location-image'>
                                </div>
                                <div className='location-details'>
                                    <div className='location'>
                                        {`${city}, ${state}`}
                                        <i class="fa-solid fa-star"></i>
                                    </div>
                                    <div className='location-price'>
                                        {`$${Math.floor(price)} night`}
                                    </div>
                                </div>

                            </NavLink>
                            <div>
                                <NavLink to={`/spots/${id}/edit`}>
                                    <button >Edit</button>
                                </NavLink>
                                <button onClick={() => { dispatch(deleteLocation(id)) }}>Delete</button>
                            </div>
                        </div>
                ))}
            </div>
        </div >
    )
}


export default BecomeHost
