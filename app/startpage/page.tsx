import { Navbar } from "../components/Navbar"
import { LeftSideBar } from "../leftsidebar/page"
import { Resturant } from "../lib/interface"
import { client } from "../lib/sanity"

async function getResturants() {
  const query = `
  *[_type == "restaurant"] {
    name,
    category,
    estimatedTime,
    price,
    slug,
    titleImage,
    smallDescription,
    openOrClosed
  }
  `
  const data = await client.fetch(query)
  return data
}

export default async function Home() {
  const resturants: Resturant[] = await getResturants()
  console.log(resturants)
  return (
    <div className="bg-[#FAFAFA] md:p-10 p-4 ">
      <Navbar />
      <LeftSideBar resturants={resturants} />
    </div>
  )
}
