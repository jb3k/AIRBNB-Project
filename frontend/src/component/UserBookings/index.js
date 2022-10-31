import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { deleteBookingThunk, getUserBookingsThunk } from '../../store/bookings'
import './UserBookings.css'

function UserBookings() {

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory()

    const userBookings = useSelector((state) => Object.values(state.bookings))
    console.log("HELLOOOOOOOO", userBookings)


    useEffect(() => {
        dispatch(getUserBookingsThunk())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    if (!sessionUser) {
        history.push('/')
    }

    let bookings = userBookings.map((booked) => {

        const { id, startDate, endDate, Spot } = booked
        const { previewImage, address, city, state } = Spot


        return (
            <>
                <div className='user-bookings-container'>
                    <div className='user-bookings-spot-image-container'>
                        <img src={previewImage} alt='spot picture' className='user-bookings-spot-image'></img>
                    </div>
                    <div className='user-bookings-spot-text-container'>
                        <div>
                            <div>
                                Address: {address}
                            </div>
                            <div>
                                {city}, {state}
                            </div>
                            <div>
                                <div>
                                    Check-In: {startDate}
                                </div>
                                <div>
                                    Checkout: {endDate}
                                </div>
                            </div>

                        </div>
                        <div>
                            <button className='edit-host-bttn'>Edit</button>
                            <button className='delete-host-bttn' onClick={() => { dispatch(deleteBookingThunk(id)) }}>Delete</button>
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
