import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createReviewThunk } from "../../store/reviews";
import { getSpotId, spot, updateLocation } from "../../store/spots";
import './ReviewFormPage.css'


function CreateReview() {


    const dispatch = useDispatch();
    const sessionUser = useSelector((state) =>
        state.session.user
    );
    const history = useHistory()
    const { spotId } = useParams()



    useEffect(() => {
        dispatch(getSpotId(spotId))

    }, [dispatch])


    const [review, setReview] = useState('')
    const [stars, setStars] = useState(1)
    const [isLoaded, setIsLoaded] = useState(false)
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault();

        if (review.length < 1) errors.push('Need review')
        if (stars < 1 || stars > 5) errors.push('Input Valid Star Rating')

        if (!errors.length) {
            dispatch(createReviewThunk(spotId))
                .then(() => setIsLoaded(true))

        } else {
            setErrors(errors)
        }

        setSubmitted(true)
        alert('Review has been submitted')
        history.push(`/spots/${spotId}`)
    };


    return (
        { sessionUser } && { isLoaded } &&
        (<div className="whole-form">
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Review:
                    <input
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Stars:
                    <input
                        type="integer"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" >Create Review</button>
            </form>
        </div>
        ));
}

export default CreateReview;
