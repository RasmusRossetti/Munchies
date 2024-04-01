import { Navbar } from "../components/navbar/Navbar"
import LeftSideBar from "../leftsidebar/LeftSideBar"
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

export default async function Layout() {
  const resturants: Resturant[] = await getResturants()
  console.log(resturants)
  return (
    <div className="bg-[#FAFAFA] md:p-10 p-4 max-w-[1440px] m-auto">
      <Navbar />
      <LeftSideBar resturants={resturants} />
    </div>
  )
}
