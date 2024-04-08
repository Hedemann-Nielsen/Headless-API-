import './App.scss'
import './index.css'
import './global.css'

import { useGetAllContent } from './hooks/useGetAllContent';
import { useGetGallery } from './hooks/useGetGallery';
import backgroundImage from "../src/assets/images/background.jpg"
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from 'react';

function App() {

const { data } = useGetAllContent();
const [item, setItem] = useState();
const [selectedItemId, setSelectedItemId] = useState(null);

useEffect(() => {
  if (data && data.items && data.items.length > 2) {
  setItem(data.items[2])

}
},[data])

// console.log("data", data);

const handleImageClick = (itemId, height, width, size) => {
  setSelectedItemId(itemId);
  console.log("Item ID:", itemId);
  console.log("Height:", height);
  console.log("Width:", width);
  console.log("Size:", size);
};


  return (
    <>
     {/* Header billede */}
     <img 
         src={item?.fields?.headerImage?.fields?.file?.url} 
         alt=""
         className="w-full h-[50vh] object-cover fixed z-0 "
       />

    {/* Titel */}
     <header className="relative z-10">
         <h1 className="w-full pt-[55vh] pb-5 text-9xl text-center font-bold relative z-10 bg-gradient-to-b from-transparent to-white">
          <span className="">{item?.fields?.title}</span>
         </h1>
      </header>
      <main className='bg-white relative z-10'>

        {/* Beskrivelse sektion */}
        <section className='w-full text-center m-auto p-32' style={{ backgroundImage: `url(${backgroundImage})` }}>
          {item?.fields?.description?.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4">{paragraph?.content[0].value}</p>
          ))}
        </section>

        {/* Galleri sektion */}
       <section className="py-20 m-4 bg-cover bg-center bg-no-repeat rounded-lg ">
           <h3 className="text-7xl font-semibold text-center mb-8">Galleri</h3>
           <div className="grid grid-cols-2 gap-4 m-20 ">
             {item?.fields?.gallery?.map((item, index) => (
                <div 
                key={index} 
                className="relative overflow-hidden" 
                onClick={() => handleImageClick(item.sys.id, item.fields.file.details.image.height, item.fields.file.details.image.width, item.fields.file.details.size)}>                
                <img 
                   src={item?.fields?.file?.url}
                  //  src={item?.fields?.file?.url+`?w=100&h=100`} 

                   alt="" 
                   className="aspect-square object-cover transition-transform duration-300 transform hover:scale-105" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                   <h3 className="text-lg font-semibold text-white mb-2">{item?.fields?.title}</h3>
                   <p className="text-gray-200 text-center">{item?.fields?.description}</p>
                 </div>
               </div>
             ))}
           </div>
         </section>

          {/* kontakt sektion */}
         <section className='h-64 mb-20 p-10' style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="grid grid-cols-3 grid-rows-2 gap-8 ">

            {/* Bokse inden i sektionen  */}
            <div className="rounded-lg m-auto text-center w-full h-48 flex justify-center items-center shadow-lg bg-gradient-to-b from-[#d8def2] hover:scale-105">
              <div className='text-center text-gray-600'>
                <h3 className=' text-lg pb-3'>Kontakt</h3>
                <p >1234 Street, City</p>
                <p >Telefon: 12345678</p>
              </div>
            </div>

            <div className="rounded-lg m-auto text-center w-full h-48 flex justify-center items-center shadow-lg bg-gradient-to-b from-[#d8def2] hover:scale-105">  
              <div className='text-center text-gray-600'>
                <h3 className='text-lg pb-3'>Åbningstider</h3>
                <p>Mandag – Fredag  09.00 – 16.00</p>
                <p>Lørdag 11.00 –  14.00</p>
                <p>Søndag og helligdage: Lukket</p>
              </div>
            </div>

            <div className="rounded-lg m-auto text-center w-full h-48 flex justify-center items-center shadow-lg bg-gradient-to-b from-[#d8def2] hover:scale-105">      
              <div className='flex text-5xl'>
                    <FaFacebook className='mr-4' />
                    <FaInstagram />
              </div>
            </div>
          </div>
        </section>
      </main>
 <useGetGallery />
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
         <div className="container mx-auto flex flex-col items-center justify-center">
           <h3 className="text-xl font-bold">Designd by</h3>
           <h2 className="text-lg font-bold">{item?.fields?.designers}</h2>
         </div>
     </footer> 

    </>
  )
}

export default App;
