import React from 'react'
import { useParams } from 'react-router-dom'

// imports from components
import useFetch from '../api/useFetch';
import Navigation from '../components/Navigation';
import DrawingBoard from '../components/DrawingBoard';


export default function PastEchoesWithin() {
  const{id} = useParams();
  const apiUrl = gon.api_url;

  return (
    <>
    <Navigation />
    <DrawingBoard />
    </>
  )
}
