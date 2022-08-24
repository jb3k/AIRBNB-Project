import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SpotFormPage.css';
import LoginFormModal from "../LoginFormModal";
import spotsReducer from "../../store/spots";
import { spot } from '../../store/spots'
import { addSpots } from "../../store/spots";


function SpotFormPage() {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) =>
        state.session.user
    );

    useEffect(() => {
        dispatch(spot())
    }, [dispatch])


    //i want to get the owner id from the session 

    const [ownerId, setOwnerId] = useState()
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState(2);
    const [lng, setLng] = useState(2);
    const [name, setName] = useState("");
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(1);
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)



    const handleSubmit = (e) => {
        e.preventDefault();

        if (address.length < 1) errors.push('Need valid address')
        if (city.length < 1) errors.push('Need valid city')
        if (state.length < 1) errors.push('Need valid state')
        if (country.length < 1) errors.push('Need valid country')
        if (lat < 1) errors.push('Need valid lat')
        if (lng < 1) errors.push('Need valid lng')
        if (name.length < 1) errors.push('Need valid title')
        if (description.length < 1) errors.push('Need valid description')
        if (price < 1) errors.push('Need valid price')
        // setOwnerId(sessionUser.id)

        if (!errors.length) {
            dispatch(addSpots({ address, city, state, country, lat, lng, name, description, price }))
        } else {
            setErrors(errors)
        }

        
        setSubmitted(true)
        alert('Home has been submitted')
        reset()
    };

    const reset = () => {
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setName('')
        setDescription('')
        setPrice(1)
    }

    return (
        <div className="whole-form">
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Lattitude
                    <input
                        type="integer"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Longitude
                    <input
                        type="integer"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Title
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    price
                    <input
                        type="integer"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" >Submit Home</button>
            </form>
        </div>
    );
}

export default SpotFormPage;
