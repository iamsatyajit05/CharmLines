import Header from "./component/Header"
import PickupLinesList from "./component/PickupLineList"
import { getServerSession } from "next-auth";
import authOptions from "@/lib/options";

export default async function Home() {
  const userDetail = {};

  const session = await getServerSession(authOptions);

  if (!session) { } else {
    userDetail['email'] = session.user.email;
    userDetail['name'] = session.user.name;
  }

  return (
    <>
      {!userDetail.email && <Header isSignin={false} />}
      {userDetail.email && <Header isSignin={true} userDetail={userDetail} />}
      <main className="max-w-3xl mx-auto pt-4">
        <PickupLinesList user={userDetail.email} />
      </main>
    </>
  )
}
