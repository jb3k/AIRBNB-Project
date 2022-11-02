import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import './SpotFormPage.css';
import { spot, addSpots, addImageSpotThunk } from '../../store/spots'



function SpotFormPage() {

    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {
        dispatch(spot())
            .then(() => setSubmitted(true))
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
    const [previewImage, setPreviewImage] = useState('')
    const [errorValidation, setErrorValidation] = useState([])
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        const errors = []
        if (address.length < 3) errors.push('Need valid address to be at least 3 characters')
        if (city.length < 1 && city.length > 30) errors.push('Need valid city')
        if (state.length < 1 && state.length > 30) errors.push('Need valid state')
        if (country.length < 1 && country.length > 30) errors.push('Need valid country')
        if (lat < 1) errors.push('Need valid lat')
        if (lng < 1) errors.push('Need valid lng')
        if (name.length < 1 && name.length > 50) errors.push('Need valid title, cannot be longer than 50 characters')
        if (description.length < 1) errors.push('Need valid description')
        if (price < 1 || price > 1000) errors.push('Need valid price between 1 and 1000')
        // if (!validImage(previewImage)) errors.push('Need Valid image url')
        if (!previewImage.includes('.jpg') && !previewImage.includes('.jpeg') && !previewImage.includes('.png')) errors.push('Need image url to include .jpg, .jpeg, or .png')

        return setErrorValidation(errors)

    }, [address, city, state, country, lat, lng, name, description, price, previewImage])

    function validImage(img) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(img)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errorValidation.length >= 1) {
            errorValidation.map(err => {
                return alert(err)
            })
            return
        }

        let newSpot
        // if (!errorValidation.length) {
        setErrorValidation([]);
        alert('Home has been submitted')
        newSpot = await dispatch(addSpots({ address, city, state, country, lat, lng, name, description, price, previewImage }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrorValidation(data.errors);
            })
        history.push(`/`)
        return newSpot




    };



    return (
        <>
            <div className='navbar-spacer'> </div>
            <div className="whole-form">
                <h2 className="h2-text">Create a Spot</h2>
                <form onSubmit={handleSubmit}>
                    {/* <ul>
                    {submitted && errorValidation.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> */}
                    <label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="Address"
                            minLength={3}

                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            placeholder="City"
                            maxLength={30}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            placeholder="State"
                            maxLength={30}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            placeholder="Country"
                            maxLength={30}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            required
                            placeholder="Lattitude"
                            min={-90}
                            max={90}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            required
                            placeholder="Longitude"
                            min={-90}
                            max={90}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Spot Name"
                            maxLength={50}
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
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            placeholder="Price"
                            min={1}
                            max={1000}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                            required
                            placeholder="Image Url"
                        />
                    </label>
                    <button className="create-bttn" type="submit" >Create Spot</button>
                </form>
            </div>
        </>
    );
}

export default SpotFormPage;
