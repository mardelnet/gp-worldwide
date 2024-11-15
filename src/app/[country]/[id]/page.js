import React from 'react';
import Image from "next/image";
import {urls, api} from "../../constants";

export default async function ArtistPage({ params }) {
    const { country, id } = await params; // Access country and id from params

    let data = await fetch(`${urls.proxy}/?${urls.gp}/${country}/${api.posts}/${id}`);
    let posts = await data.json()

    // const [media, setMedia] = useState(null);

    // useEffect(() => {
    //   async function fetchMedia() {
    //     const res = await fetch(`${urls.proxy}/?${urls.gp}/${country}/${api.media}/${artistID.featured_media}`);
    //     const data = await res.json();
    //     setMedia(data);
    //   }
    //   fetchMedia();
    // }, [artistID.featured_media]);

    // if (!media) return null;

    console.log(posts)
  
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
            <a href='/'>
              Go Back
            </a>
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
                <div>
                  <a href={posts.link} target="_blank" rel="noopener noreferrer">
                    {/* <Image
                      src={media.source_url}
                      width={100}
                      height={100}
                      alt="Greenpeace Image"
                      priority
                    /> */}
                  </a>
                  <div className="post-data">
                    <p dangerouslySetInnerHTML={{ __html: posts.modified }}></p>
                    <h2 dangerouslySetInnerHTML={{ __html: posts.title.rendered }}></h2>
                    <p dangerouslySetInnerHTML={{ __html: posts.content.rendered }}></p>
                  </div>
                </div>
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
  
