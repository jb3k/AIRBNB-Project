import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './bookings.css'
import { addBookingThunk } from '../../store/bookings';


const Bookings = ({ spotId }) => {

    const dispatch = useDispatch()
    const history = useHistory()


    const [errorValidation, setErrorValidation] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [addStart, setAddStart] = useState('')
    const [addEnd, setAddEnd] = useState('')



    useEffect(() => {
        const errors = []


        return setErrorValidation(errors)

    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errorValidation.length >= 1) {
            errorValidation.map(err => {
                return err
            })
            return
        }

        const payload = { startDate: addStart, endDate: addEnd }
        dispatch(addBookingThunk(spotId, payload))

        //push to user bookings page that I will create...
        history.push(`/`)

        setErrorValidation([]);



    };


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
                            onKeyDown={(e) => e.preventDefault()}
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
                            onKeyDown={(e) => e.preventDefault()}
                            required={true}
                            min={min}
                            className='booking-input'
                            type="date"
                            value={addEnd}
                            onChange={(e) => setAddEnd(e.target.value)}
                        />
                    </div>
                </div>
            </form>
            <button className='booking-reserve-bttn' onClick={handleSubmit}> Reserve </button>
        </div >
    )

}

export default Bookings
