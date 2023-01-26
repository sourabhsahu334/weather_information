import React, { useState, useEffect } from 'react';
import axios from 'axios';
import City from './City'
import "./weather.css"

const Weather = () => {
    const [weather, setWeather] = useState([]);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://sourabhweather.onrender.com/weather/${pagination.currentPage}`);
                setWeather(response.data);
                setPagination({...pagination,totalPages:3});
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
        console.log(weather);
    }, [pagination.currentPage]);

    const handlePrevClick = () => {
        if (pagination.currentPage > 1) {
            setPagination({ ...pagination, currentPage: pagination.currentPage - 1 });
        }
    };

    const handleNextClick = () => {
        if (pagination.currentPage < pagination.totalPages) {
            setPagination({ ...pagination, currentPage: pagination.currentPage + 1 });
        }
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
           
               
                <div className='city'>
                    {weather.map((item) => (
                 <City key={item.id} item={item}/>
                    ))}
                </div>
           
            <div>
                <button onClick={handlePrevClick} disabled={pagination.currentPage === 1}>
                    Prev
                </button>
                <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
                <button onClick={handleNextClick} disabled={pagination.currentPage === pagination.totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Weather;
