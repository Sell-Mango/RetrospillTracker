"use client"

import { useEffect, useState } from "react";

export default function Browse() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const GET_URL = "https://api.igdb.com/v4/games";
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_URL, {
          method: "POST",
          headers: {
            "Client-ID": "",
            "Authorization": "",
            "Accept": "application/json"
          }
        });
        if (!response.ok) throw new Error("Error")
        const result: string = await response.json()
        setData(result)
        setLoading(false)
        console.log(data)
      } catch (err) {
        if (
          typeof err === "object" &&
          err &&
          "message" in err &&
          typeof err.message === "string"
        )
        console.log(err.message)
      } 
    }
    fetchData();
  }, [])

  if (loading) return <p>Laster...</p>
  if (error) return <p>Feil: {error}</p>
  
  return (
    <h1>Browse</h1>
  )
}