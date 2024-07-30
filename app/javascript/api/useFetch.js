import React from 'react'
import { useState, useEffect } from 'react';

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [error, setError] = useState(null);
    useEffect(() => {

        const abortCont = new AbortController();

        setTimeout(() => {
            setTimeout(() => {
                setLoadingProgress(25);
            }, 250);
            fetch(url, {signal: abortCont.signal})
            .then(res => {
                if (!res.ok){
                    throw Error("Could not fetch data for that resource.");
                }
                setTimeout(() => {
                    setLoadingProgress(50);
                }, 500);
                return res.json();
            }).then(data => {
                setData(data);
                setTimeout(() => {
                    setLoadingProgress(75);
                }, 1000);
                setTimeout(() => {
                    setLoadingProgress(100);
                }, 1500);
                setTimeout(() => {
                    setIsPending(false);
                    setError(null);
                }, 2500);
            }).catch(err =>{
                if(err.name === "AbortError"){
                    console.log("fetch aborted");
                } else {
                    setLoadingProgress(100);
                    setTimeout(() => {
                        setError(err.message);
                        setIsPending(false);
                    }, 2000);
                }
            });
        }, 1000);

        return () => abortCont.abort();
    }, [url]);

    return {
        data, isPending, error, loadingProgress
    }
}
