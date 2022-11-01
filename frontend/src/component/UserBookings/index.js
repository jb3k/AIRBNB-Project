import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteBookingThunk, getUserBookingsThunk } from '../../store/bookings'
import EditBookings from '../EditBookings'
import './UserBookings.css'

function UserBookings() {

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [editBooking, setEditBooking] = useState(false)
    const [showEditInputListingId, setShowEditInputListingId] = useState(0);
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory()

    const userBookings = useSelector((state) => Object.values(state.bookings))

    useEffect(() => {
        dispatch(getUserBookingsThunk())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    if (!sessionUser) {
        history.push('/')
    }

    if (!userBookings) return null
    let bookings = userBookings.map((booked) => {

        const { id, startDate, endDate, Spot } = booked
        if (Spot === undefined) return null
        const { previewImage, address, city, state } = Spot

        return (
            <>
                <div className='user-bookings-container' key={id}>
                    <div className='user-bookings-spot-image-container'>
                        <img src={previewImage} alt='spot picture' className='user-bookings-spot-image'></img>
                    </div>
                    <div className='user-bookings-spot-text-container'>
                        <div>
                            <div className='user-bookings-spot-text-address-container'>
                                <div className='user-bookings-spot-text-address'>
                                    Address: {address}
                                </div>
                                <div className='user-bookings-spot-text-address'>
                                    {city}, {state}
                                </div>
                            </div>
                            <div className='user-bookings-spot-text-dates-container'>
                                <div className='user-bookings-spot-text-dates'>
                                    Check-In Date: <strong> {startDate} </strong>
                                </div>
                                <div className='user-bookings-spot-text-dates'>
                                    Checkout Date : <strong> {endDate} </strong>
                                </div>
                            </div>

                        </div>
                        <div>
                            <button className='edit-host-bttn' onClick={() => {
                                setEditBooking(!editBooking)
                                setShowEditInputListingId(id)
                            }}>Edit</button>
                            <button className='delete-host-bttn' onClick={() => { dispatch(deleteBookingThunk(id)) }}>Delete</button>
                            {editBooking && showEditInputListingId === id && <EditBookings bookingId={id} checkin={startDate} checkout={endDate} setEditBooking={setEditBooking} thunk={getUserBookingsThunk} />}
                        </div>
                    </div>
                </div>
            </>
        )
    })



    return isLoaded && (
        <div className='whole-page'>
            <div className='user-bookings-divider'>
                <h2 className='today-text'>Your Current Bookings</h2>
            </div>
            <div className='all-user-bookings'>
                {bookings}
            </div>
        </div >
    )
}


export default UserBookings
