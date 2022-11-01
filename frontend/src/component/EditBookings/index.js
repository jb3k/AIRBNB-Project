import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditBookings.css'
import { updateBookingThunk } from "../../store/bookings";



const EditBookings = ({ bookingId, checkin, checkout, setEditBooking, thunk }) => {


    // const [commentContent, setCommentContent] = useState(review.review)
    const dispatch = useDispatch();
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [addStart, setAddStart] = useState(checkin)
    const [addEnd, setAddEnd] = useState(checkout)
    const [errorValidation, setErrorValidation] = useState([])



    const today = new Date();
    let min = today?.toISOString().slice(0, 8)
    let last = Number(today?.toISOString().slice(8, 10)) + 1
    min = min + last

    const date = new Date().toISOString().slice(0, 10)
    // console.log(date < checkout)
    useEffect(() => {
        const errors = []
        if (addStart === "" || addEnd === "") errors.push("Please select valid start and end dates")
        if (date >= checkout || date > checkin) errors.push("You cannot edit a booking that has already passed")

        return setErrorValidation(errors)

    }, [addStart, addEnd])


    const editSubmitted = (e) => {
        e.preventDefault()
        setIsSubmitted(true)

        if (errorValidation.length >= 1) {
            errorValidation.map(err => {
                return err
            })
            return
        }

        const payload = { "startDate": addStart, "endDate": addEnd }

        dispatch(updateBookingThunk(bookingId, payload))
            .then(() => dispatch(thunk()))


        setEditBooking(false)

    }


    return (
        <div className='edit-bookings-input'>
            <form onSubmit={editSubmitted}>
                <div className='bookings-error-handling' style={{ marginTop: '15px' }}>
                    {isSubmitted && errorValidation.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='edit-bookings-form-container'>
                    <div className='booking-checkin-input'>
                        <label className='booking-input-label'> CHECK-IN</label>
                        <input
                            className='edit-bookings-container'
                            type="date"
                            value={addStart}
                            onChange={(e) => setAddStart(e.target.value)}
                            min={min}
                        />
                    </div>
                    <div style={{ marginTop: '15px' }}><i class="fa-solid fa-arrow-right"></i> </div>
                    <div className='booking-checkin-input'>
                        <label className='booking-input-label'> CHECKOUT</label>
                        <input
                            className='edit-bookings-container'
                            type="date"
                            value={addEnd}
                            onChange={(e) => setAddEnd(e.target.value)}
                            min={min}
                        />
                    </div>
                </div>
                <button className='edit-host-bttn' type="submit"> Save </button>
            </form>
        </div >
    )


}

export default EditBookings
