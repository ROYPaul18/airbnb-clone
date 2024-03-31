import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const IndexPage = () => {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('places').then(response => {
      setPlaces([...response.data],);
    })
  }, [])
  return (
    <div className=" mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {places.length > 0 && places.map(place => (
        <div>
          <div className="flex bg-gray-500 mb-2 rounded-2xl"> 
          {place.photos?.[0] && (
            <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:5002/uploads/'+place.photos[0]} alt="" />
          )}
          </div>
          <h2 className="text-sm truncate ">{place.title}</h2>
          <h3 className="font-bold ">{place.address}</h3>
        </div>
      ))} 
    </div>
  );
};

export default IndexPage;
