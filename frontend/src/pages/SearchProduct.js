import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalCard from '../components/VerticalCard';

const SearchProduct = () => {
    const query = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.searchProduct.url + query.search);
            const dataResponse = await response.json();
            setData(dataResponse.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [query.search]);

    return (
        <div className='container mx-auto p-4'>
            {loading && (
                <p className='text-lg text-center text-gray-600'>Loading...</p>
            )}

            <p className='text-lg font-semibold my-4'>
                Search Results: {data.length}
            </p>

            {data.length === 0 && !loading && (
                <p className='bg-gray-100 text-lg text-center p-4 rounded shadow-md'>
                    No Data Found...
                </p>
            )}

            {data.length !== 0 && !loading && (
                <VerticalCard loading={loading} data={data} />
            )}
        </div>
    );
};

export default SearchProduct;
