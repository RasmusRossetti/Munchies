"use client"
import Image from "next/image"
import { Resturant } from "../lib/interface"
import { urlFor } from "../lib/sanity"
import Link from "next/link"

interface Props {
  resturants: Resturant[]
  filteredRestaurants: Resturant[]
  noResults: Boolean
}

export default function Restaurants({
  resturants,
  filteredRestaurants,
  noResults
}: Props) {
  // Function to sort filtered restaurants with closed ones last
  const sortFilteredRestaurants = (restaurants: Resturant[]) => {
    const openRestaurants = restaurants.filter(
      (restaurant) => restaurant.openOrClosed === "open"
    )
    const closedRestaurants = restaurants.filter(
      (restaurant) => restaurant.openOrClosed === "closed"
    )
    return [...openRestaurants, ...closedRestaurants]
  }
  return (
    <div className="flex">
      <div className="flex-grow md:flex-grow-0 bg-slate h-screen ">
        <h2 className="text-4xl py-6">Restaurant&apos;s</h2>
        <div className="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-2 xl:grid-cols-3 ">
          {/* Display filtered restaurants if available, otherwise display all restaurants */}
          {filteredRestaurants.length > 0 ? (
            sortFilteredRestaurants(filteredRestaurants).map(
              (restaurant, index) => (
                <div
                  key={index}
                  className="w-full md:w-[327px] transition-all "
                >
                  {/* Restaurant card */}
                  <Link href="">
                    <div className="mb-10 bg-white rounded-md shadow-md flex flex-col text-black w-full h-[202px] hover:bg-slate-100 transition-all">
                      <div className="flex-none">
                        <div className="flex justify-between mb-4">
                          {/* Apply opacity styling if restaurant is closed */}
                          <div
                            className={`p-2 rounded-full flex h-[30px] mt-3 ml-4 border-[#0000001A] border-solid border-[0.6px] `}
                          >
                            <div
                              className={`w-3 h-3 rounded-full mr-2 mt-[2px]  ${
                                restaurant.openOrClosed === "open"
                                  ? "bg-[#00703A]"
                                  : "bg-black"
                              }`}
                            />
                            <p className="text-lg font-semibold -mt-2">
                              {restaurant.openOrClosed}
                            </p>
                          </div>
                          <p
                            className={`text-sm p-2 flex items-center h-[30px] mt-3 ml-4 border-[#0000001A] border-solid border-[0.6px] rounded-full ${
                              restaurant.openOrClosed === "closed"
                                ? "hidden"
                                : ""
                            }`}
                          >
                            {restaurant.estimatedTime === "1"
                              ? "1+ hour"
                              : `${restaurant.estimatedTime} min`}
                          </p>
                          <Image
                            src={urlFor(restaurant.titleImage.asset).url()}
                            alt={restaurant.name}
                            width={100}
                            height={100}
                            className={`w-24 h-24 object-cover rounded-md ${
                              restaurant.openOrClosed === "closed"
                                ? "opacity-50"
                                : ""
                            }`}
                          />
                        </div>
                        {restaurant.openOrClosed === "closed" && (
                          <div className="relative bottom-5 bg-[#FAFAFA] border-solid border-[0.6px] border-[#0000001A] rounded-md text-center w-[60%] p-1 m-auto">
                            Opens tomorrow at 12
                          </div>
                        )}
                      </div>
                      <div className="flex-grow flex items-end justify-between p-4">
                        <p
                          className={`text-lg font-semibold ${
                            restaurant.openOrClosed === "closed"
                              ? "opacity-50"
                              : ""
                          }`}
                        >
                          {restaurant.name}
                        </p>{" "}
                        <div
                          className={`w-6 h-6 bg-[#00703A] rounded-full flex justify-center items-center ${
                            restaurant.openOrClosed === "closed"
                              ? "opacity-50"
                              : ""
                          }`}
                        >
                          <Image
                            src={"/arrow.svg"}
                            alt={"arrow"}
                            width={50}
                            height={50}
                            className={`h-3 w-3 rounded-md ${
                              restaurant.openOrClosed === "closed"
                                ? "opacity-50"
                                : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            )
          ) : // If no filtered restaurants, display all restaurants or show no results message
          noResults ? (
            <p className="text-black text-2xl">
              No restaurants match the current filter criteria :( .
            </p>
          ) : (
            // Display all restaurants
            sortFilteredRestaurants(resturants).map((restaurant, index) => (
              <div key={index} className="w-full md:w-[327px]  transition-all">
                {/* Restaurant card */}
                <Link href="">
                  <div className="mb-10 bg-white rounded-md shadow-md flex flex-col text-black w-full h-[202px] hover:bg-slate-100 transition-all">
                    <div className="flex-none">
                      <div className="flex justify-between mb-4">
                        {/* Apply opacity styling if restaurant is closed */}
                        <div
                          className={`p-2 rounded-full flex h-[30px] mt-3 ml-4 border-[#0000001A] border-solid border-[0.6px] ${
                            restaurant.openOrClosed === "closed"
                              ? "opacity-50"
                              : ""
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full mr-2 mt-[2px]  ${
                              restaurant.openOrClosed === "open"
                                ? "bg-[#00703A]"
                                : "bg-black"
                            }`}
                          />
                          <p className="text-lg font-semibold -mt-2">
                            {restaurant.openOrClosed}
                          </p>
                        </div>
                        <p
                          className={`text-sm p-2 flex items-center h-[30px] mt-3 ml-4 border-[#0000001A] border-solid border-[0.6px] rounded-full ${
                            restaurant.openOrClosed === "closed" ? "hidden" : ""
                          }`}
                        >
                          {restaurant.estimatedTime === "1"
                            ? "1+ hour"
                            : `${restaurant.estimatedTime} min`}
                        </p>
                        <Image
                          src={urlFor(restaurant.titleImage.asset).url()}
                          alt={restaurant.name}
                          width={100}
                          height={100}
                          className={`w-24 h-24 object-cover rounded-md ${
                            restaurant.openOrClosed === "closed"
                              ? "opacity-50"
                              : ""
                          }`}
                        />
                      </div>
                      {/* Display "Opens tomorrow at 12" message if restaurant is closed */}
                      {restaurant.openOrClosed === "closed" && (
                        <div className="relative bottom-5 bg-[#FAFAFA] border-solid border-[0.6px] border-[#0000001A] rounded-md text-center w-[60%] p-1 m-auto">
                          Opens tomorrow at 12
                        </div>
                      )}
                    </div>

                    <div className="flex-grow flex items-end justify-between p-4">
                      <p
                        className={`text-lg font-semibold ${
                          restaurant.openOrClosed === "closed"
                            ? "opacity-50"
                            : ""
                        }`}
                      >
                        {restaurant.name}
                      </p>{" "}
                      <div
                        className={`w-6 h-6 bg-[#00703A] rounded-full flex justify-center items-center ${
                          restaurant.openOrClosed === "closed"
                            ? "opacity-50"
                            : ""
                        }`}
                      >
                        <Image
                          src={"/arrow.svg"}
                          alt={"arrow"}
                          width={50}
                          height={50}
                          className={`h-3 w-3 rounded-md ${
                            restaurant.openOrClosed === "closed"
                              ? "opacity-50"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
