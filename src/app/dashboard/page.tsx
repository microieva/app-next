"use client";

import { AdminDashboard } from "@/components/admin-dashboard";
import { Alert } from "@/components/alert";
import { Loading } from "@/components/loading";
import { UserDashboard } from "@/components/user-dashboard";
import { User } from "@/types/types";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [me, setMe] = useState<Partial<User> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        if (data.me) {
          setMe(data.me);
        }
      })
      .catch(error => {
        setError(error.response.data.error);
      })
      .finally(()=> {setLoading(false)}); 
  }, []);

  if (error) return <Alert onConfirm={()=>setError(null)} message={error} type="error"/>

  return (
    <div>
      {loading && <Loading/>}
      {me && me.role?.name === 'admin' ? 
        <AdminDashboard me={me} />
        :
        <UserDashboard me={me} />}    
    </div>
  );
};
