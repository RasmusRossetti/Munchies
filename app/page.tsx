import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  return (
    <div className="bg-[#00703A] min-h-screen flex flex-col justify-center items-center p-10">
      <div className="absolute top-8 left-8">
        <Image
          src="/munchies-white.svg"
          alt="munchies Logo"
          className="hidden md:block"
          width={400}
          height={24}
          priority
        />
        <Image
          src="/munchies-white.svg"
          alt="munchies Logo"
          className="md:hidden w-full"
          width={400}
          height={24}
          priority
        />
      </div>
      <div className="text-left">
        <div className="flex flex-col ">
          <h1
            className="text-white text-[48px] md:text-6xl text-left font-sfpro f"
            style={{
              fontWeight: 760,
              lineHeight: "58px",
              letterSpacing: "-1px"
            }}
          >
            Treat <br /> Yourself.
          </h1>
          <p className="text-white mt-1 md:mt-3">
            Find the best restaurants in your city and get it delivered to your
            place!
          </p>
          <Link
            className="hidden md:block w-[50%] md:w-[30%] mt-6 px-10 py-2  text-white border-solid border-[1px] border-white rounded-md hover:bg-white transition-all hover:text-[#00703A]"
            href={"/resturantlayout"}
          >
            Continue
          </Link>
        </div>
      </div>
      <Link
        className="absolute md:hidden bottom-4 w-[90%] text-center  mt-6 px-10 py-2  text-white border-solid border-[1px] border-white rounded-md hover:bg-white transition-all hover:text-[#00703A]"
        href={"/resturantlayout"}
      >
        Continue
      </Link>
    </div>
  )
}
