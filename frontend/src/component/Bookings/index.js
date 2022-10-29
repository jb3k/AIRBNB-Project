import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './bookings.css'
import { addBookingThunk } from '../../store/bookings';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';



const Bookings = ({ spotId }) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()

    const [showModal, setShowModal] = useState(false);
    const [errorValidation, setErrorValidation] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [addStart, setAddStart] = useState('')
    const [addEnd, setAddEnd] = useState('')



    useEffect(() => {
        const errors = []
        if (addStart === "" || addEnd === "") errors.push("Please select a start and end date")

        return setErrorValidation(errors)

    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true)


        if (errorValidation.length >= 1) {
            errorValidation.map(err => {
                return err
            })
            return
        }

        const payload = { "startDate": addStart, "endDate": addEnd }

        console.log(addStart, addEnd)
        dispatch(addBookingThunk(spotId, payload))

        alert('Booking Submitted')
        //push to user bookings page that I will create...
        // history.push(`/`)
        setAddStart('')
        setAddEnd('')
        setErrorValidation([]);



    };

    let userAuth;
    if (sessionUser) {
        userAuth = (
            <>
                <button className='booking-reserve-bttn' type='submit'> Reserve </button>
            </>
        )
    } else {
        userAuth = (
            <>
                <button className='booking-reserve-bttn' onClick={() => setShowModal(true)}> Reserve </button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginForm />
                    </Modal>
                )}
            </>
        )

    }



    const today = new Date();
    let min = today?.toISOString().slice(0, 8)
    let last = Number(today?.toISOString().slice(8, 10)) + 1
    min = min + last

    return (
        <div className='whole-bookings-input'>
            <form onSubmit={handleSubmit}>
                <div>
                    {isSubmitted && errorValidation.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='booking-reservation-date'>
                    <div className='booking-checkin-input'>
                        <label className='booking-input-label'> CHECK-IN</label>
                        <input
                            className='booking-input'
                            type="date"
                            value={addStart}
                            onChange={(e) => setAddStart(e.target.value)}
                            min={min}
                            required={true}
                        />
                    </div>
                    <div className='booking-divider'></div>
                    <div className='booking-checkin-input'>
                        <label className='booking-input-label'> CHECKOUT</label>
                        <input
                            className='booking-input'
                            type="date"
                            value={addEnd}
                            onChange={(e) => setAddEnd(e.target.value)}
                            min={min}
                            required={true}
                        />
                    </div>
                </div>
                {userAuth}
            </form>
        </div >
    )

}

export default Bookings
