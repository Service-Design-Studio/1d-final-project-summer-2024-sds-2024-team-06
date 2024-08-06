import React from 'react'
import { useState, useEffect } from 'react';

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {

        const abortCont = new AbortController();

        setTimeout(() => {
            console.log("fetching data from: ", url);
            fetch(url, {signal: abortCont.signal})
            .then(res => {
                if (!res.ok){
                    throw Error("Could not fetch data for that resource.");
                }
                console.log("data fetched");
                return res.json();
            }).then(data => {
                setData(data);
                setIsPending(false);
            }).catch(err =>{
                if(err.name === "AbortError"){
                    console.log("fetch aborted");
                } else {
                    setError(err.message);
                    setIsPending(false);
                }
            });
        }, 1000);

        return () => abortCont.abort();
    }, [url]);

    return {
        data, isPending, error
    }
}
