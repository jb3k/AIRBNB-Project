import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getSpotId } from '../../store/spots'


function SpotId() {

    const dispatch = useDispatch()
    const { spotId } = useParams()

    // an array of all the spots
    const properties = useSelector((state) => state.spots)
    console.log(properties)
    // console.log(state.spots)
    // Object.values(state.spotsReducer)

    // console.log(properties)
    //giving me the list of IDs of each property in an array
    // const propertyIdObj = properties.find((ele) => ele.id == spotId)
    let arr = []
    // arr.push(propertyIdObj)
    // console.log(arr[0])
    // let propertyId = Object.values(propertyIdObj)
    // console.log(propertyId)

    useEffect(() => {
        dispatch(getSpotId())
    }, [dispatch])


    if (!properties) return null

    return (
        <div className='whole-page'>
            <h1>Home</h1>
            <div className=''>
                {arr.map((spot) => {
                    <div className='location-container'>
                        <div className='location-image'>
                            {/* <img src={previewImage} className='image'></img> */}
                        </div>
                        <div className='location-details'>
                            <div key={spot?.id} className='location'>
                                {`${spot?.city}, ${spot?.state}`}
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div key={spot?.id} className='location-price'>
                                {`$${Math.floor(spot?.price)} night`}
                            </div>

                        </div>

                    </div>
                })}
            </div>

        </div>
    )

}


export default SpotId
