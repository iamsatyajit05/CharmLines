import Header from "./component/Header"
import PickupLinesList from "./component/PickupLineList"

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto pt-4">
      <Header />
      <PickupLinesList />
    </main>
  )
}
