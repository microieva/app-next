"use client"

import { Loading } from "@/components/loading";
import { useEffect, useState } from "react";

export default function Account() {
  const [me, setMe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {

    fetch('/api/account')
      .then(res => res.json())
      .then(data => {
        setMe(data.me)
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(()=> {setLoading(false)});

  }, []);

  if (loading) return <Loading/>;

  return (
    <div>
      <h1>ACCOUNT VIEW</h1>
      {me ? <div>
        <p>name: {me.firstName} {me.lastName}</p>
        <p>role: {me.role.name}</p>
      </div> : <></>}
    </div>
  );
};