import Header from "./component/Header"
import PickupLinesList from "./component/PickupLineList"

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto pt-4">
        <PickupLinesList />
      </main>
    </>
  )
}
