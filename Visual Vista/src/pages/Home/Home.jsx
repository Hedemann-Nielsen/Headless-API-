import { createClient } from 'contentful';
import React, { useEffect, useState } from 'react';
import backgroundImage from "../../assets/images/background.png"
export const Home = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const client = createClient({ 
      space: "vx3nnsuh9is9", 
      accessToken: "AML3vUCipke3sGFunVaeMYawpYSKe1bQmLi1s7hImh0"
    });

    const getAllEntries = async () => {
      try {
        const entries = await client.getEntries();
        setContent(entries.items[2]);
      } catch (error) {
        console.error("Fejl ved hentning af indhold:", error);
      }
    };
  
    getAllEntries();
  }, []);

  // Tjek om content er defineret
  if (!content.fields) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <img 
        src={content.fields.headerImage.fields.file.url} 
        alt=""
        className="w-full mt-4 h-[50vh] object-cover fixed z-0 "
      />
      <header className="relative z-10">
        <h1 className="w-full pt-[55vh] pb-5 text-9xl text-center font-bold relative z-10 bg-gradient-to-b from-transparent to-white">
          <span className="">{content.fields.title}</span>
        </h1>
      </header>
      <main className='bg-white relative z-10 px-32'>
        <div className="">
          {content.fields.description.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4">{paragraph.content[0].value}</p>
          ))}
        </div>
        <section className="py-20 m-4 bg-cover bg-center bg-no-repeat rounded-lg ">
          <h3 className="text-7xl font-semibold text-center text-white mb-8">Galleri</h3>
          <div className="grid grid-cols-2 gap-4 m-20 ">
            {content.fields.gallery.map((item, index) => (
              <div key={index} className="relative overflow-hidden">
                <img 
                  src={item.fields.file.url} 
                  alt="" 
                  className="aspect-square object-cover transition-transform duration-300 transform hover:scale-105" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.fields.title}</h3>
                  <p className="text-gray-200 text-center">{item.fields.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold">Designd by</h3>
          <h2 className="text-lg font-bold">{content.fields.designers}</h2>
        </div>
      </footer>
    </>
  );
}
