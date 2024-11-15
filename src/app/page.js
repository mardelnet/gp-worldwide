'use client'
 
import { useState, useEffect } from 'react'
import Image from "next/image";
import {urls, api, nros} from "./constants";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [currentSelection, setCurrentSelection] = useState("everywhere");
  const [country, setCountry] = useState("international");

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`${urls.proxy}/?${urls.gp}/${country}/${api.posts}?per_page=5`);
      const data = await res.json();
  
      setPosts(data);
      setCurrentSelection(country);
    }
    fetchPosts();
  }, [country]);  

  return (
    <div className="main-container">
      <header>
        <Image
          src="/top-banner2.jpeg"
          width={738}
          height={80}
          alt="Greenpeace Image"
          priority
        />
      </header>
      <div className="container">
        <aside>
          <div className='filters'>
            <h3>
              News filters:
            </h3>
            <label htmlFor="campaign">Campaign:</label>
            <select>
              <option>All</option>
              <option>Climate</option>
              <option>Biodiversity</option>
              <option>Social and Economic</option>
            </select>
            <label htmlFor="country">Country:</label>
            <div className='countries'>
              {nros.map((nro) => (
                nro.countries.map((country, index) => (
                    <div>
                      <input 
                        key={index} 
                        type="checkbox" 
                        id={country} 
                        name={country} 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                      {country}
                    </div>
                ))
              ))}
            </div>
          </div>
          <Image
            src="/deepgreen150.gif"
            width={150}
            height={220}
            alt="Greenpeace Image"
            priority
          />
          <div>
            You're the visitor #7789997
          </div>
        </aside>
        <main>
          {
            !posts && (<div>Loading...</div>)
          }
          {
            posts && (
              <>
                <h1>News from {currentSelection}:</h1>
                {posts.map((post, index) => (
                  <div key={index} className="post">
                    <div className="post-data">
                      <p dangerouslySetInnerHTML={{ __html: post.modified }}></p>
                      <a href={`${country}/${post.id}`} target="_self" rel="noopener noreferrer">
                        <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
                      </a>
                      <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
                    </div>
                  </div>
                ))}
              </>
            )
          }
        </main>
        <aside>
          <Image
            src="/monthinpicsmarch07.gif"
            width={150}
            height={150}
            alt="Greenpeace Image"
            priority
          />
          <Image
            src="/donations.gif"
            width={148}
            height={50}
            alt="Greenpeace Image"
            priority
          />
          <Image
            src="/notsupported.png"
            width={150}
            height={150}
            alt="Greenpeace Image"
            priority
          />
        </aside>
      </div>
      <footer>
        <audio src="/song.mp3" autoPlay controls></audio>
      </footer>
    </div>
  );
}
