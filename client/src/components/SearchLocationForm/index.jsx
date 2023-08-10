import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { FETCH_CITY_DATA } from "../../utils/mutations";


function SearchLocationForm() {
    const [cityName, setCityName] = useState('');
    const [fetchCityData, { error }] = useMutation(FETCH_CITY_DATA);

    const handleSubmit = async (event) => {
        try {

            event.preventDefault();
            const response = await fetchCityData({ variables: { cityName } });
            setCityName('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCityName(value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                list="cities"
                type="text"
                value={cityName}
                onChange={handleInputChange}
                placeholder="Enter city name"
            />
            <datalist id="cities">
                <option value="Bilbao" />
                <option value="Bondi" />
                <option value="Cape Town" />
                <option value="Honolulu" />
                <option value="Lisbon" />
                <option value="Malibu" />
                <option value="Rio de Janeiro" />
                <option value="Sydney" />
                <option value="Tel Aviv" />
            </datalist>
            <button type="submit">Submit</button>
        </form>
    );
}

export default SearchLocationForm;
