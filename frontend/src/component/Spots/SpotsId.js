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
    console.log(properties)

    //giving me the list of IDs of each property in an array
    const propertyId = properties.find((ele) => {
        //want to find where this === spotId
        console.log(ele.id)
    })

    console.log(propertyId)


    useEffect(() => {
        dispatch(spot())
    }, [dispatch])

    if (!properties) return null

    return (
        <div>

        </div>
    )

}


export default SpotId
