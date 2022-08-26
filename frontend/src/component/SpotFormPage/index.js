import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import './SpotFormPage.css';
import LoginFormModal from "../LoginFormModal";
import { spot, addSpots, addImageSpotThunk } from '../../store/spots'



function SpotFormPage() {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) =>
        state.session.user
    );
    const history = useHistory()
    useEffect(() => {
        dispatch(spot())
    }, [dispatch])


    //i want to get the owner id from the session 

    const [ownerId, setOwnerId] = useState()
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState("");
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState([]);
    const [imageUrl, setImageUrl] = useState('')
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
                .then(result => addImageSpotThunk(result.id, imageUrl))
        } else {
            setErrors(errors)
        }


        setSubmitted(true)
        alert('Home has been submitted')
        history.push(`/`)
        // reset()
    };

    // const reset = () => {
    //     setAddress('')
    //     setCity('')
    //     setState('')
    //     setCountry('')
    //     setName('')
    //     setDescription('')
    //     setPrice(1)
    // }

    return (
        <div className="whole-form">
            <h2 className="h2-text">Create a Spot</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        placeholder="Address"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder="City"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        placeholder="State"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        placeholder="Country"
                    />
                </label>
                <label>
                    <input
                        type="integer"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                        placeholder="Lattitude"
                    />
                </label>
                <label>
                    <input
                        type="integer"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        required
                        placeholder="Longitude"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Spot Name"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Description"
                    />
                </label>
                <label>
                    <input
                        type="integer"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder="Price"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                        placeholder="Image Url"
                    />
                </label>
                <button className="create-bttn" type="submit" >Create Spot</button>
            </form>
        </div>
    );
}

export default SpotFormPage;
