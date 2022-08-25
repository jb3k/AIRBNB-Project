import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { createReviewThunk, getSpotReviewThunk } from '../../store/reviews'
import { deleteSpot, getSpotId, spot } from '../../store/spots'


function SpotId() {

    const dispatch = useDispatch()
    const { spotId } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)

    // take a look at state and return something from it from the reducer
    const allSpots = useSelector((state) => state.spots)
    // console.log(allSpots)
    const currReviews = useSelector((state) => Object.values(state.reviews))
    console.log(currReviews)

    // return value of the reducer
    const oneSpot = allSpots[spotId]
    // console.log(oneSpot)

    useEffect(() => {
        dispatch(getSpotId(spotId))
        dispatch(getSpotReviewThunk(spotId))
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId])

    if (!currReviews) return null

    const displayReviews = currReviews.map((review) => (
        <div className='user-review'>
            <p>{`${review.User.firstName}`}</p>
        </div>
    ))

    const createReviewBttn = (
        <NavLink to='/review/create'>
            <button>
                New Review
            </button>
        </NavLink>


    )


    return isLoaded && (
        <div className='whole-page'>
            <h1>Home</h1>
            <div className=''>
                <div className='location-container'>
                    <div className='location-image'>
                        {/* <img src={spotImage} className='image'></img> */}
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
                    {/* <NavLink to={`/spots/${oneSpot?.id}/edit`}>
                        <button >Edit</button>
                    </NavLink>
                    <button onClick={() => { dispatch(deleteSpot(oneSpot.id)) }}>Delete</button> */}
                </div>
            </div>
            <div className='reviews-container'>
                {displayReviews}
            </div>
            <div>
                {createReviewBttn}
            </div>
        </div>
    )

}


export default SpotId
