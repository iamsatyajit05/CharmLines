"use client"
import { useEffect, useState } from "react";
import Header from "./component/Header"
import PickupLinesList from "./component/PickupLineList"

export default function Home() {
  const [isSignin, setIsSignin] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        setUserDetail({
          'email': data.userEmail,
          'name': data.userName
        })
        setIsSignin(true);
        setIsLoading(false);
      } else {
        console.error(data.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error updating record:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Header isSignin={isSignin} userDetail={userDetail} />
        <main className="max-w-3xl mx-auto pt-4">
          {!isLoading && (
            <PickupLinesList user={userDetail.email} />
          )}
          {isLoading && (
            <p className="text-center">Wait a bit too find best pickupline to start conversation 🙃</p>
          )}
        </main>
    </>
  )
}
