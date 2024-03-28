import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const PhotosUploader = ({addedPhotos, onChange}) => {
    
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
        onChange(prev =>{
            return [...prev, filename];
        });
        setPhotoLink('');
      }
       function uploadPhoto(ev){
        const files = ev.target.files;
        const data = new FormData();
        for(let i =0; i < files.length; i++){    
         data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: {'Content-type':'multipart/form-data'}
        }).then(response => {
            const {data:filenames} = response;
            onChange(prev =>{
                return [...prev, ...filenames];
            });
        })
      }
  return (
    <>
     <div className="flex gap-2">
              <input 
                type="text" 
                placeholder={"Add using a link ...jpg"} 
                value={photoLink}
                onChange={ev => setPhotoLink(ev.target.value)}
                />
              <button 
                className="bg-gray-200 px-4 rounded-2xl"
                onClick={addPhotoByLink}
                >
                {" "}
                Add&nbsp;photo
              </button>
            </div>
            
            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map(link=>(
                    <div className="h-48 flex" key={link}>
                        <img className="rounded-2xl w-full object-cover"src={'http://localhost:5002/uploads/'+link} />
                    </div>
                ))}
              <label className="h-48 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
              <input type="file" className="hidden" onChange={uploadPhoto}/>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </label>
            </div>
    </>
  )
}

export default PhotosUploader
