import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editReviewThunk, getSpotReviewThunk } from '../../store/reviews';
import './editReview.css'



const EditReview = ({ review, setEditForm, spotId }) => {


    const [commentContent, setCommentContent] = useState(review.review)
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    if (review.userId !== sessionUser.id) return null

    const editSubmitted = (e) => {
        e.preventDefault()
        const reviewObj = { "userId": review.User.id, "review": commentContent, "stars": review.stars }
        console.log(reviewObj)
        dispatch(editReviewThunk(review.id, reviewObj))
            .then(() => dispatch(getSpotReviewThunk(spotId)))
        setEditForm(false)
    }


    return (
        <form id="edit-comment-form" onSubmit={editSubmitted}>
            <textarea
                id="edit-comment-input-textarea"
                type="textarea"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}>
            </textarea>
            <button className='delete-review-bttn' type="submit">Submit</button>
        </form>
    )


}

export default EditReview
