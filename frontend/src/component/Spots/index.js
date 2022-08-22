import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { spot } from '../../store/spots'

function Spots() {

    const dispatch = useDispatch()

    // const properties = useSelector(state =>
    //     Object.values(state)
    // )
    

    // useEffect(() => {
    //     dispatch(spot())

    // }, [dispatch])

    // if (!properties) return null

    return (
        <div>
            {/* {properties.map((spots) => (
                <li key={spots.id}>
                    <NavLink to={''}>{spots}</NavLink>
                </li>
            ))} */}
            <div className="all-spots">
                This is the intro to the spots

            </div>
        </div>

    )
}

export default Spots
