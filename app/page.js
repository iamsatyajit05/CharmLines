"use client"
import { useEffect, useState } from "react";
import Header from "./component/Header"
import PickupLinesList from "./component/PickupLineList"

export default function Home() {
  const [isSignin, setIsSignin] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  const getUserInfo = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (data.error) {
        setIsSignin(false);
        return;
      }

      if (response.ok) {
        setUserDetail({
          'email': data.userEmail,
          'name': data.userName
        })
        setIsSignin(true);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Header isSignin={isSignin} userDetail={userDetail} />
      <main className="max-w-3xl mx-auto pt-4">
        <PickupLinesList user={userDetail.email} />
      </main>
    </>
  )
}
