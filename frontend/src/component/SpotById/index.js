import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { deleteReviewThunk, getSpotReviewThunk } from '../../store/reviews'
import { deleteSpot, getSpotId, spot } from '../../store/spots'
import './SpotById.css'


function SpotId() {

    const dispatch = useDispatch()
    const { spotId } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)

    const sessionUser = useSelector((state) => state.session.user);
    // take a look at state and return something from it from the reducer
    const allSpots = useSelector((state) => state.spots)

    const currReviews = useSelector((state) => Object.values(state.reviews))
    // console.log(currReviews)

    // return value of the reducer

    useEffect(() => {
        dispatch(getSpotId(spotId))
        dispatch(getSpotReviewThunk(spotId))
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId])


    const spot = allSpots[spotId]
    console.log(spot)
    const displaySpot = () => {
        const image = spot.Images[0].url

        return (
            <div className='spot-page'>
                <div className='spot-header'>
                    <h1>{spot.name}</h1>
                </div>
                <div className='spot-details-header'>
                    <div>
                        <i class="fa-solid fa-star"></i>
                        {Math.round(spot.avgRating * 100) / 100}
                    </div>
                    <div className='spot-details-reviews'>
                        {`${spot.NumReviews} reviews`}
                    </div>
                    <div className='spot-details-filler'>
                        Superhost
                        <i class="fa-solid fa-circle-small"></i>
                    </div>
                    <div className='spot-header-location'>
                        {`${spot.city}, ${spot.state}, ${spot.country}`}
                    </div>
                </div>
                <div className='spot-image-header'>
                    <img className={'spot-image-header-image'} src={image}></img>
                </div>
                <div className='spot-details-bottom'>
                    <div>
                        <h3>{`Entire home hosted by ${spot.Owner.firstName}`}</h3>
                    </div>
                    <div>
                        <p>{spot.description}</p>
                    </div>
                </div>
            </div>

        )
    }

    const displayReviews = currReviews.map((review) => {
        const userReview = review.User.id
        let button
        if (sessionUser) {
            if (sessionUser.id === userReview) {
                { button = <button onClick={() => dispatch(deleteReviewThunk(review.id))}> Delete </button> }
            }
        }

        return (
            <div className='user-review'>
                <div className='top-user-container'>
                    <row className='review-header'>
                        <div className='profile-icon-container'>
                            <i className={'profile-icon'} class="fa-solid fa-user"></i>
                        </div>
                        <div className='review-author'>
                            <p className='review-user-name'>{`${review.User.firstName}`}</p>
                        </div>
                    </row>
                </div>
                <div>
                    <row className='review-name'>
                        <div className='actual-review'>
                            <p>{review.review}</p>
                        </div>
                        {button}
                    </row>
                </div>
            </div>
        )
    })



    const createReviewBttn = (
        <NavLink to={`/spots/${spotId}/review`}>
            <button>
                New Review
            </button>
        </NavLink>


    )


    return isLoaded && (
        <div className='whole-page'>
            <div>
                {displaySpot()}
            </div>
            <div className='reviews-container'>
                {displayReviews}
            </div>
            <div>
                {createReviewBttn}
            </div>
        </div>
    )




    //     <div className=''>
    //     <div className='location-container'>
    //         <div className='location-image'>
    //             {/* <img src={spotImage} className='image'></img> */}
    //         </div>
    //         <div className='location-details'>
    //             <div key={oneSpot?.id} className='location'>
    //                 {`${oneSpot?.city}, ${oneSpot?.state}`}
    //                 <i class="fa-solid fa-star"></i>
    //             </div>
    //             <div key={oneSpot?.id} className='location-price'>
    //                 {`$${Math.floor(oneSpot?.price)} night`}
    //             </div>
    //         </div>
    //     </div>
    //     <div>
    //         {/* <NavLink to={`/spots/${oneSpot?.id}/edit`}>
    //             <button >Edit</button>
    //         </NavLink>
    //         <button onClick={() => { dispatch(deleteSpot(oneSpot.id)) }}>Delete</button> */}
    //     </div>
    // </div>



}


export default SpotId
