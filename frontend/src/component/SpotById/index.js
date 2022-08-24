import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { deleteSpot, getSpotId, spot } from '../../store/spots'


function SpotId() {

    const dispatch = useDispatch()
    const { spotId } = useParams()

    // take a look at state and return something from it from the reducer
    const allSpots = useSelector((state) => state.spots)

    // return value of the reducer
    const oneSpot = allSpots[spotId]
    // console.log(oneSpot)

    useEffect(() => {
        dispatch(getSpotId(spotId))
    }, [dispatch, spotId])

    if (!oneSpot) return null
    if (!oneSpot.Images) return null

    const spotImage = oneSpot.Images[0].url
    // console.log(spotImage)


    return (
        <div className='whole-page'>
            <h1>Home</h1>
            <div className=''>
                <div className='location-container'>
                    <div className='location-image'>
                        <img src={spotImage} className='image'></img>
                    </div>
                    <div className='location-details'>
                        <div key={oneSpot?.id} className='location'>
                            {`${oneSpot?.city}, ${oneSpot?.state}`}
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <div key={oneSpot?.id} className='location-price'>
                            {`$${Math.floor(oneSpot?.price)} night`}
                        </div>
                    </div>
                </div>
                <div>
                <NavLink to={`/spots/${oneSpot?.id}/edit`}>
                    <button >Edit</button>
                </NavLink>
                <button onClick={dispatch(deleteSpot(spotId))}>Delete</button>
                </div>
            </div>

        </div>
    )

}


export default SpotId
