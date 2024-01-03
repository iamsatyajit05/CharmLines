import PickupLines from "./PickupLine"

export default function PickupLinesList() {
    return (
        <section class="px-4 mb-24">
            <ul class="divide-y">
                {
                    [0, 1, 2, 3, 4, 5].map((e) => <PickupLines key={e} />)
                }
            </ul>
        </section>
    )
}