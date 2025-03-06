"use client";

import { AdminDashboard } from "@/components/admin-dashboard";
import { Loading } from "@/components/loading";
import { UserDashboard } from "@/components/user-dashboard";
import { User } from "@/types/types";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [me, setMe] = useState<Partial<User> | null>(null);
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        if (data.me) {
          setMe(data.me);
          setRole((data.me.role.name).toString() || '');
        }
      })
      .catch(error => {
        setError(error.response.data.error);
      })
      .finally(()=> {setLoading(false)}); 
  }, []);

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
