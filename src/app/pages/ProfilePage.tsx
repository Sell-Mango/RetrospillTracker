"use client"
import { useEffect, useState } from "react"

// interface Game {
//   id: number;
//   name: string;
//   rating?: number;
//   summary?: string;
// }

export default function ProfilePage(){
  // const [data, setData] = useState<Game[] | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const GET_URL = "https://api.igdb.com/v4/games";
  
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch(GET_URL, {
  //         method: "POST",
  //         headers: {
  //           "Client-ID": process.env.TWITCH_API_ID as string,
  //           "Authorization": `Bearer ${process.env.OAUTH_TOKEN}`, 
  //           "Content-Type": "text/plain",
  //         },
  //         body: "fields name,rating,summary; limit 5;"
  //       });
        
  //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  //       const result = await response.json();
  //       setData(result);
  //     }
  //     catch (err: any){
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
    
  //   fetchData();
  // }, []);
  
  // if (loading) return <div>Laster...</div>;
  // if (error) return <div>Feil: {error}</div>;
  
  return (
    <h1>ProfilePage</h1>
  )
}