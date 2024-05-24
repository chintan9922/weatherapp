import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { options, url } from "../api";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        const response = await fetch(
            `${url}?namePrefix=${inputValue}&limit=10&minPopulation=10000`,
            options,
        );
        const response_1 = await response.json();
        return {
            options: response_1.data.map((city) => {
                // console.log(city, "city");
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                    cityName: `${city.name}`,
                    cityID: `${city.wikiDataId}`,
                };
            }),
        };
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;
