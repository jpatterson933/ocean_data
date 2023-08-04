import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { FETCH_CITY_DATA } from "../../utils/mutations";


function LocationForm() {
    const [cityName, setCityName] = useState('');
    const [fetchCityData, { error }] = useMutation(FETCH_CITY_DATA);

    const handleSubmit = async (event) => {
        try {

            event.preventDefault();
            console.log(event, "event")

            const response = await fetchCityData({ variables: {cityName} });
            console.log(response.data.fetchCityData, "working???")
            setCityName(''); // reset form input
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setCityName(value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={cityName}
                onChange={handleInputChange}
                placeholder="Enter city name"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default LocationForm;
