import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { deleteReviewThunk, getSpotReviewThunk } from '../../store/reviews'
import { deleteSpot, getSpotId, spot } from '../../store/spots'
import './SpotById.css'


function SpotId() {

    const dispatch = useDispatch()
    const { spotId } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const history = useHistory()
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
    }, [dispatch])


    const spot = allSpots[spotId]
    const displaySpot = () => {
        if (!spot?.Images) return null
        const image = spot?.Images[0].url
        return isLoaded && (
            <div className='spot-page'>
                <div className='spot-header'>
                    <h1>{spot?.name}</h1>
                </div>
                <div className='spot-details-header'>
                    <div>
                        <i class="fa-solid fa-star"></i>
                        {Math.round(spot?.avgRating * 100) / 100}
                    </div>
                    <div className='spot-details-reviews'>
                        <div className='dot-text'>
                            {' · '}
                        </div>
                        <div className='top-header-reviews'>
                            {`${spot?.NumReviews} reviews`}
                        </div>
                    </div>
                    <div className='spot-details-filler'>
                        {'·  Superhost  ·'}
                        <i class="fa-solid fa-circle-small"></i>
                    </div>
                    <div className='spot-header-location'>
                        {`${spot?.city}, ${spot?.state}, ${spot?.country}`}
                    </div>
                </div>
                <div className='spot-image-header'>
                    <img className={'spot-image-header-image'} src={image}></img>
                </div>
                <div className='spot-details-bottom'>
                    <div className='name-description'>
                        <div className='spot-details-name'>
                            <h3>{`Entire home hosted by ${spot?.Owner.firstName}`}</h3>
                        </div>
                        <div className='spot-details-description'>
                            <p className='p-description'>{spot?.description}</p>
                        </div>
                    </div>
                    <div className='price-bttn'>
                        <div className='massive-bttn'>
                            <div className='in-price-text-bttn'>
                                <div className='price-text'>
                                    {`$${Math.floor(spot?.price)}`}
                                </div>
                                <div className='night-text'>
                                    night
                                </div>
                            </div>

                            <div className='star-reviews'>
                                <div className='star-icon-rating'>
                                    <i class="fa-solid fa-star"></i>
                                    {Math.round(spot?.avgRating * 100) / 100}
                                </div>
                                <div className='dot-text'>
                                    {' · '}
                                </div>
                                <div className='massive-bttn-review-details'>
                                    {`${spot?.NumReviews} reviews`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }


    let reviewId = []

    const displayReviews = currReviews.map((review) => {
        reviewId.push(review?.userId)
        const userReview = review?.User?.id
        let button
        if (sessionUser) {
            if (sessionUser?.id === userReview) {
                {
                    button = <button className='delete-review-bttn'
                        onClick={() => { dispatch(deleteReviewThunk(review?.id)).then(() => dispatch(getSpotId(spotId))) }}> Delete </button>
                }
            }
        }
        const dateNumbers = spot?.createdAt
        const dateText = new Date(dateNumbers)
        const dateArr = dateText.toString().split(' ')
        const month = dateArr[1]
        const year = dateArr[3]

        return isLoaded && (
            <div className='user-review'>
                <div className='top-user-container'>
                    <row className='review-header'>
                        <div className='profile-icon'>
                            <i class="fas fa-user-circle fa-2xl"></i>
                        </div>
                        <div className='name-date'>
                            <div className='review-author'>
                                <li className='review-user-name'>{`${review?.User?.firstName}`}</li>
                                <li className='date'>{`${month} ${year}`}</li>
                            </div>
                        </div>
                    </row>
                </div>
                <div>
                    <div className='actual-review'>
                        <p>{review.review}</p>
                    </div>
                    <div>
                        {button}
                    </div>
                </div>
            </div>
        )
    })


    let createReviewBttn
    if (sessionUser && (!reviewId.includes(sessionUser?.id) && (sessionUser?.id !== spot?.Owner?.id))) {
        createReviewBttn = (
            <NavLink to={`/spots/${spotId}/review`}>
                <button className='create-review-bttn'>
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

    } else {

        return isLoaded && (
            <div className='whole-page'>
                <div>
                    {displaySpot()}
                </div>
                <div className='reviews-container'>
                    {displayReviews}
                </div>
            </div>
        )
    }




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
