'use client'
 
import { useState, useEffect } from 'react'
import Image from "next/image";
import { formatDate, convertDates } from './utils/functions';
import {urls, api, nros} from "./constants";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [singlePost, setSinglePost] = useState(null);
  const [country, setCountry] = useState([]);
  const [date, setDate] = useState("week");
  const [showAllPosts, setShowAllPost] = useState(true);

  async function showPost(country, postId) {
    try {
      let data = await fetch(`${urls.proxy}/?${urls.gp}/${country}/${api.posts}/${postId}`);
      let postData = await data.json();
      setSinglePost(postData);
      setShowAllPost(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  function selectCountries(selectedCountry) {
    setCountry((prevCountries) => {
      // Check if the country already exists in the array
      if (!prevCountries.includes(selectedCountry)) {
        return [...prevCountries, selectedCountry]; // Add the new country
      }
      return prevCountries.filter((newCountry) => newCountry !== country);
    }
  )}

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchPromises = country.map((c) => {
          const url = nros[c].link ?? `${urls.gp}/${c}`

          return fetch(`${urls.proxy}/?${url}/${api.posts}?after=${convertDates(date)}&per_page=100`)
            .then((res) => res.json())
            .then((data) => {
              // Add the country name to each post in the data
              return data.map((post) => ({ ...post, country: c }));
            })
        });
  
        // Use Promise.all to fetch all data concurrently
        const allData = await Promise.all(fetchPromises);
  
        // Combine all the posts into a single array
        const combinedPosts = allData.flat(); // Flatten if each response is an array
  
        // Sort posts by date (newest first)
        const sortedPosts = combinedPosts.sort((a, b) => {
          const dateA = new Date(a.date);  // Assuming `a.date` is the date field
          const dateB = new Date(b.date);  // Assuming `b.date` is the date field
          return dateB - dateA; // Sort in descending order (newest first)
        });
  
        // Set the sorted posts
        setPosts(sortedPosts);
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
          {
            singlePost && !showAllPosts && (
              <div className='filters'>
                <button onClick={() => setShowAllPost(true)}>
                  See all news
                </button>
              </div>
            )
          }
          {
            showAllPosts && (
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
                <div className="countries">
                  {Object.values(nros).map((nro, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={nro.value}
                        name={nro.name}
                        value={nro.value}
                        onClick={(e) => selectCountries(e.target.value)}
                      />
                      <label htmlFor={nro.value}>{nro.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
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
            singlePost && !showAllPosts && (
              <div className="post-data">
                {/* <span dangerouslySetInnerHTML={{ __html: formatDate(singlePost.modified) }}></span> */}
                <h2 dangerouslySetInnerHTML={{ __html: singlePost.title.rendered }}>
                </h2>
                <p dangerouslySetInnerHTML={{ __html: singlePost.content.rendered }}></p>
              </div>
            )
          }
          {
            posts && showAllPosts && (
              <>
                <h1>{posts.length} Greenpeace news found:</h1>
                {posts.map((post, index) => (
                  <div key={index} className="post" onClick={() => showPost(post.country, post.id)}>
                    <div className="post-data">
                      <Image
                        src={`flags/${nros[post.country].flag}.svg`}
                        width={15}
                        height={15}
                        alt="NRO flag"
                        className='flag'
                      />
                      <span dangerouslySetInnerHTML={{ __html: formatDate(post.modified) }}></span>
                      <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
                      <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
                    </div>
                  </div>
                ))}
              </>
            )
          }
          {
            !posts && showAllPosts && (
              <div>
                <h1>Welcome to the Greenpeace Global News Network!</h1>
                <p>We are thrilled to have you join us at this exciting time in Greenpeace’s global efforts to protect our environment. This site serves as your gateway to news, updates, and the latest stories from Greenpeace offices all around the world. As our movement continues to grow, we strive to bring you the most current and important news from all of our campaigns, actions, and environmental initiatives, no matter where they are taking place.</p>
                <p>From protecting forests to fighting climate change, Greenpeace is on the front lines of environmental activism across the globe. With this website, we aim to keep you connected with the heart of our work and to share with you the victories, challenges, and important moments that shape the future of our planet.</p>
                <p>Whether you’re an activist, a supporter, or simply someone interested in learning more about the vital work we do, you will find here a wealth of stories and insights from our teams in every corner of the world. Join us in spreading awareness, taking action, and working together for a healthier, more sustainable future.</p>
                <p>Thank you for visiting and for standing with us as we continue our mission for a better world.</p>
                <button onClick={() => selectCountries("international")}>
                  Read news from Greenpeace International
                </button>
              </div>
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
        <Image
          src="/badge1.gif"
          width={80}
          height={15}
          alt="Greenpeace Image"
          priority
        />
        <Image
          src="/badge2.gif"
          width={80}
          height={15}
          alt="Greenpeace Image"
          priority
        />
        <Image
          src="/badge3.gif"
          width={80}
          height={15}
          alt="Greenpeace Image"
          priority
        />
        <Image
          src="/badge4.gif"
          width={80}
          height={15}
          alt="Greenpeace Image"
          priority
        />
        <Image
          src="/badge5.gif"
          width={80}
          height={15}
          alt="Greenpeace Image"
          priority
        />
      </footer>
    </div>
  );
}
