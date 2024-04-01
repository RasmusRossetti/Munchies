"use server"
import Image from "next/image"

export const Navbar = () => {
  return (
    <div className="mb-0 mt-5 md:mb-14 ">
      <Image
        src="/munchies.svg"
        alt="munchies Logo"
        className="hidden md:block"
        width={400}
        height={24}
        priority
      />
      <Image
        src="/munchies.svg"
        alt="munchies Logo"
        className="md:hidden w-1/2"
        width={400}
        height={24}
        priority
      />
    </div>
  )
}
