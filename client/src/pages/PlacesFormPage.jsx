import React from 'react'
import { useState } from 'react';
import AccountNav from '../AccountNav';
import PhotosUploader from '../PhotosUploader';
import PerksLabels from '../PerksLabels';
import { Navigate, useParams } from 'react-router';
import axios from 'axios';
import { useEffect } from 'react';


const PlacesFormPage = () => {
  const{id} = useParams();
  const [title, setTitle] = useState('');
  const [address, setAdress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if(!id){
      return;
    }
    axios.get('places/'+id)
    .then(response=> {
      const {data} = response;
      setTitle(data.title);
      setAdress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    })
  }, [id])

  function inputHeader(text){
    return(
        <h2 className="text-2xl mt-4">{text}</h2>
    )
  }
  function inputDescription(text){
    return(
        <p className="text-gray-500 text-sm">{text}</p>
    )
  }
  function preInput(header, description){
    return(
        <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
    );
  }
  async function savePlace(ev){
    ev.preventDefault();
    const placeData = { title, address, addedPhotos, 
      description, perks, extraInfo, 
      checkIn, checkOut, maxGuests}
    if(id){
      await axios.put('/places', {
        id,
       ...placeData
    });
    setRedirect(true);
    }else{
    await axios.post('/places',placeData)
    setRedirect(true);
    }
  }
  if(redirect){
    return <Navigate to={'/account/places'} />
  }


  return (
    <div>
        <AccountNav />
          <form onSubmit={savePlace}>
            {preInput('Title','Title for your, should be short and catchy as in advertissement' )}
            <input
              type="text"
              placeholder="title, for example: My lovely apt"
              value={title}
              onChange={ev => setTitle(ev.target.value)}
            />
             {preInput('Address','Adress to this place' )}
            <input 
                type="text" 
                placeholder="address" 
                value={address}
                onChange={ev => setAdress(ev.target.value)}
                />
            {preInput('Photos','More = better' )}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
            {preInput('Description','Describe your place' )}
            <textarea 
               
                value={description}
                onChange={ev => setDescription(ev.target.value)}
            />
            {preInput('PerksPerks','Select all the perks of your place' )}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
              <PerksLabels selected={perks} onChange={setPerks} />
            </div>
            {preInput('Extra Info',' what rules, etc' )}
            <textarea 
            value={extraInfo}
            onChange={ev => setExtraInfo(ev.target.value)}
            />
            {preInput('Check in&out times, max guests','  add check in and out times, remember to have some time window for cleaning the room between guest' )}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                <div>
                    <h3 className="mt-2 -mb-1"> Check in time</h3>
                    <input 
                        type="text" 
                        placeholder="14:00"
                        value={checkIn}
                        onChange={ev => setCheckIn(ev.target.value)}
                        />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Check in out</h3>
                    <input 
                        type="text"  
                        placeholder="11:00"
                        value={checkOut}
                        onChange={ev => setCheckOut(ev.target.value)}
                        />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1"> Max number of guests</h3>
                    <input 
                        type="number" 
                        value={maxGuests}
                        onChange={ev => setMaxGuests(ev.target.value)}
                        />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1"> Prices per night</h3>
                    <input 
                        type="number" 
                        value={price}
                        onChange={ev => setPrice(ev.target.value)}
                        />
                </div>
            </div>
                <button className="primary my-4"> Save </button>
          </form>
        </div>
  )
}

export default PlacesFormPage
