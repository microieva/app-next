"use client";

import { Alert } from "@/components/alert";
import { Loading } from "@/components/loading";
import { Plan } from "@/types/types";
import { useEffect, useState } from "react";

export default function Plans() {
   const [plans, setPlans] = useState<Plan[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      fetch('/api/plans')
        .then(res => res.json())
        .then(data => {
          if (data.plans && data.plans.length>0) {
            setPlans(data.plans);
          }
        })
        .catch(error => {
          setError(error.response.data.error);
        })
        .finally(()=> {setLoading(false)}); 
    }, []);
  
  if (loading) return <Loading/>
  if (error) return <Alert onConfirm={()=>setError(null)} message={error} type="error"/>

  return (
    <>
     {plans ? 
      <div>
        <h1 className="h1"> VIEW WITH PLANS</h1>
      </div>
      :
      <div>
        <h1 className="h1">Create new plan</h1>
      </div>}
    </>
  );
};