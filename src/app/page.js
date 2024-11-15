'use client'
 
import { useState, useEffect } from 'react'
import Image from "next/image";
import {urls, api, nros} from "./constants";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [country, setCountry] = useState(["international"]);
  const [date, setDate] = useState("week");

  function convertDates() {
    const today = new Date();
  
    if (date === "day") {
      today.setDate(today.getDate() - 1);
    } else if (date === "week") {
      today.setDate(today.getDate() - 7);
    } else if (date === "month") {
      today.setDate(today.getDate() - 30);
    } else {
      today.setDate(today.getDate() - 365);
    }
  
    // Format the date to the desired format "YYYY-MM-DDT23:59:59"
    const formattedDate = today.toISOString().split("T")[0] + "T23:59:59";
  
    return formattedDate;
  }

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchPromises = country.map((c) =>
          fetch(`${urls.proxy}/?${urls.gp}/${c}/${api.posts}?after=${convertDates()}&per_page=100`).then((res) => res.json())
        );
  
        // Use Promise.all to fetch all data concurrently
        const allData = await Promise.all(fetchPromises);
  
        // Combine or process the results as needed
        const combinedPosts = allData.flat(); // Flatten if each response is an array
        setPosts(combinedPosts); // Update the posts state with the combined results
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
  
    if (country.length > 0) {
      fetchPosts();
    }
  }, [country, date]);
  
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
            <label htmlFor="date">Date:</label>
            <select id="date" onChange={(e) => setDate(e.target.value)}>
              <option value="day">Last 24 hours</option>
              <option value="week" selected>Last week</option>
              <option value="month">Last month</option>
              <option value="year">Last year</option>
            </select>
            {/* <label htmlFor="campaign">Campaign:</label>
            <select>
              <option>All</option>
              <option>Climate</option>
              <option>Biodiversity</option>
              <option>Social and Economic</option>
            </select> */}
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
                        onClick={(e) => {
                          const selectedCountry = e.target.value;
                          setCountry((prevCountries) => {
                            // Check if the country already exists in the array
                            if (!prevCountries.includes(selectedCountry)) {
                              return [...prevCountries, selectedCountry]; // Add the new country
                            }
                            return prevCountries.filter((newCountry) => newCountry !== country);
                          });
                        }}                        
                      />
                      {country}
                    </div>
                ))
              ))}
            </div>
          </div>
          <Image
            src="/monthinpicsmarch07.gif"
            width={150}
            height={150}
            alt="Greenpeace Image"
            priority
          />
        </aside>
        <main>
          {
            !posts && (<div>Loading...</div>)
          }
          {
            posts && (
              <>
                <h1>Showing {posts.length} news of the last {date} from {country.join(", ")}:</h1>
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
            src="/deepgreen150.gif"
            width={150}
            height={220}
            alt="Greenpeace Image"
            priority
          />
          <div>
            You're the visitor #7789997
          </div>
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
