import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { spot } from '../../store/spots'


function SpotId() {

    const dispatch = useDispatch()
    const { spotId } = useParams()

    // an array of all the spots
    const properties = useSelector(state =>
        // console.log(state.spotsReducer)
        Object.values(state.spotsReducer)
    )
    // console.log(properties)
    //giving me the list of IDs of each property in an array
    const propertyIdObj = properties.find((ele) => ele.id === Number(spotId))
    let propertyId = Object.values(propertyIdObj)

        console.log(propertyId)

    useEffect(() => {
        dispatch(spot())
    }, [dispatch])

    if (!properties) return null

    return (
        <div className='whole-page'>
            <h1>Home</h1>
            {propertyId.map(({ id, city, price, state, avgRating, previewImage }) => (
                <div className='location-container'>

                    <div className='location-image'>
                        <img src={previewImage} className='image'></img>
                    </div>
                    <div className='location-details'>
                        <div key={id} className='location'>
                            {`${city}, ${state}`}
                            <i class="fa-solid fa-star"></i>
                            {Math.round(avgRating * 100) / 100}
                        </div>
                        <div key={id} className='location-price'>
                            {`$${Math.floor(price)} night`}
                        </div>

                    </div>

                </div>
            ))}
        </div>
    )

}


export default SpotId
