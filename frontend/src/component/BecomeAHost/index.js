import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { deleteLocation, getCurrentUserSpot } from '../../store/spots'
import './BecomeHost.css'

function BecomeHost() {

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)


    // take a look at state and return something from it from the reducer
    const userSpots = useSelector((state) => Object.values(state.spots))
    console.log(userSpots)


    useEffect(() => {
        dispatch(getCurrentUserSpot())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    if (!userSpots) return null

    return isLoaded && (
        <div className='whole-page'>
            <div className='divider'>
                <h2 className='today-text'>Today</h2>
                <p className='p-text'> You'll be a Hose soon! Just add that last few details to your listing.</p>
                <div>
                    <NavLink to='/spots/create'>
                        <button className='add-spot-bttn'> Complete your listing </button>
                    </NavLink>
                </div>
            </div>
            <div className='spot-whole-container'>
                {userSpots.map(({ id, city, price, state, previewImage }) => (
                    <div key={id} className='location-container'>
                        <NavLink to={`/spots/${id}`}>
                            <div className='location-image'>
                                <img className='my-spot-image' src={`${previewImage}`}></img>
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
