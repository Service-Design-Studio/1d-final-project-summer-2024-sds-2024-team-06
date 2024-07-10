import React from 'react'
import CalendarGrid from '../components/CalendarGrid'
import mockUseFetch from '../components/mockUseFetch'
import useFetch from '../components/useFetch'

export default function Checkin() {

  const {data: checkinData, error, isPending} = useFetch('http://127.0.0.1:3000/api/flowers')

  console.log("Checkin component rendered");
  console.log(checkinData)
  const backgroundImageUrl = 'https://t3.ftcdn.net/jpg/01/89/65/62/360_F_189656244_Z8CvqnmXU50rO0vwTLSPF5y3aUn1Pszp.jpg';


  return (
    <div className="relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        {isPending && (
          <div className="h-full w-full flex justify-center items-center">
            <h1>Loading...</h1>
          </div>
        )}

        {error && <div>{error}</div>}

        {checkinData && (
          <div className="flex justify-center items-center">
            <CalendarGrid checkinData={checkinData} />
          </div>
        )}
      </div>
    </div>
  );
};