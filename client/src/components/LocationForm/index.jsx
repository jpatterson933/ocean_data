import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { FETCH_CITY_DATA } from "../../utils/mutations";


function LocationForm() {
    const [cityName, setCityName] = useState('');
    const [fetchCityData] = useMutation(FETCH_CITY_DATA);

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetchCityData({ variables: { cityName } });

        setCityName(''); // reset form input
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={cityName}
                onChange={(event) => setCityName(event.target.value)}
                placeholder="Enter city name"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default LocationForm;
