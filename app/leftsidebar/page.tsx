"use client"
import React, { useState } from "react"
import { Resturant } from "../lib/interface"
import { urlFor } from "../lib/sanity"
import Image from "next/image"
import Restaurants from "../resturantslayout/page"

export const LeftSideBar: React.FC<{
  resturants: Resturant[] // Corrected spelling
}> = ({ resturants }) => {
  const [filteredRestaurants, setFilteredRestaurants] = useState<Resturant[]>(
    []
  )
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDeliveryTimes, setSelectedDeliveryTimes] = useState<string[]>(
    []
  )
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedEstimatedTimes, setSelectedEstimatedTimes] = useState<
    string[]
  >([])
  const [noResults, setNoResults] = useState<boolean>(false)
  const openRestaurants = resturants.filter(
    (restaurant) => restaurant.openOrClosed !== "closed"
  )
  // Function to handle filtering based on selected filter values
  const handleFilter = (
    selectedCategories: string[],
    selectedPriceRanges: string[],
    selectedEstimatedTimes: string[]
  ) => {
    console.log("Selected categories:", selectedCategories) // Debugging statement
    let filtered = [...resturants]

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((restaurant) =>
        selectedCategories.includes(restaurant.category)
      )
    }

    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((restaurant) =>
        selectedPriceRanges.includes(restaurant.price)
      )
    }

    if (selectedEstimatedTimes.length > 0) {
      filtered = filtered.filter((restaurant) =>
        selectedEstimatedTimes.some((time) =>
          isEstimatedTimeInRange(restaurant.estimatedTime, time)
        )
      )
    }

    if (filtered.length === 0) {
      setNoResults(true)
    } else {
      setNoResults(false)
    }

    setFilteredRestaurants(filtered)
  }

  // Function to check if the estimated time is within the selected range
  const isEstimatedTimeInRange = (
    estimatedTime: string,
    selectedTime: string
  ) => {
    // If estimated time is in range format, split and check if it falls in the range
    if (estimatedTime.includes(" - ")) {
      const [min, max] = selectedTime.split(" - ").map(Number)
      const [estimatedMin, estimatedMax] = estimatedTime
        .split(" - ")
        .map(Number)
      return estimatedMin >= min && estimatedMax <= max
    } else {
      // If estimated time is a single value, check if it matches selected time
      return estimatedTime === selectedTime
    }
  }

  const formatEstimatedTime = (time: string): string => {
    if (time.includes(" - ")) {
      return `${time} min`
    } else {
      return `${time}+ hour`
    }
  }

  // Event handler for selecting estimated time range
  const handleEstimatedTimeSelect = (time: string) => {
    setSelectedEstimatedTimes((prevTimes) => {
      const updatedTimes = prevTimes.includes(time)
        ? prevTimes.filter((prevTime) => prevTime !== time) // Deselect if already selected
        : [...prevTimes, time] // Select if not already selected
      handleFilter(selectedCategories, selectedPriceRanges, updatedTimes)
      return updatedTimes
    })
  }

  // Event handler for selecting food category
  const handleCategorySelect = (category: string) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = prevCategories.includes(category)
        ? prevCategories.filter((prevCategory) => prevCategory !== category)
        : [...prevCategories, category]
      handleFilter(
        updatedCategories,
        selectedPriceRanges,
        selectedEstimatedTimes
      )
      return updatedCategories
    })
  }

  // Event handler for selecting price range
  const handlePriceRangeSelect = (range: string) => {
    setSelectedPriceRanges((prevRanges) => {
      const updatedRanges = prevRanges.includes(range)
        ? prevRanges.filter((prevRange) => prevRange !== range)
        : [...prevRanges, range]
      handleFilter(selectedCategories, updatedRanges, selectedEstimatedTimes)
      return updatedRanges
    })
  }
  // Function to clear all selected filters
  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedDeliveryTimes([])
    setSelectedPriceRanges([])
    setSelectedEstimatedTimes([])
    setNoResults(false)
    setFilteredRestaurants(resturants) // Reset filtered list to original list
  }

  const uniqueEstimatedTimes = new Set<string>()

  openRestaurants.forEach((restaurant) => {
    uniqueEstimatedTimes.add(restaurant.estimatedTime)
  })

  const uniqueEstimatedTimesArray = Array.from(uniqueEstimatedTimes)

  const uniquePriceRanges = new Set<string>()

  openRestaurants.forEach((restaurant) => {
    uniquePriceRanges.add(restaurant.price)
  })

  const uniquePriceRangesArray = Array.from(uniquePriceRanges)

  return (
    <div className=" flex">
      <div className="w-1/4 bg-white h-screen shadow-md mr-4 hidden md:block">
        <div className="p-8">
          <h2 className="text-2xl">Filter</h2>
          {openRestaurants.length > 0 && (
            <div>
              <p className="text-lg text-slate-500">FOOD CATEGORY</p>
              <div>
                <div className="inline-block mt-3">
                  {openRestaurants.map((restaurant, index) => (
                    <p
                      key={index}
                      onClick={() => handleCategorySelect(restaurant.category)}
                      className={`hover:bg-slate-100 transition-all mt-2 cursor-pointer rounded-lg border-[#0000001A] border-solid border-[0.6px] p-2 text-center ${
                        selectedCategories.includes(restaurant.category)
                          ? "bg-gray-300"
                          : ""
                      }`}
                    >
                      {restaurant.category}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div>
            <p className="text-lg text-slate-500 mt-6">DELIVERY TIME</p>
            <div className="grid grid-cols-2 gap-2 mt-4  mb-4">
              {uniqueEstimatedTimesArray.map((time, index) => (
                <p
                  key={index}
                  onClick={() => handleEstimatedTimeSelect(time)}
                  className={`cursor-pointer rounded-lg border-[#0000001A] border-solid border-[0.6px] p-2 text-center flex items-center justify-center ${
                    selectedEstimatedTimes.includes(time) ? "bg-gray-300" : ""
                  }`}
                >
                  {formatEstimatedTime(time)}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-lg text-slate-500 mt-6">PRICE RANGE</p>
            <div className="flex gap-2 mt-4">
              {uniquePriceRangesArray.map((priceRange, index) => (
                <p
                  key={index}
                  onClick={() => handlePriceRangeSelect(priceRange)}
                  className={`hover:bg-slate-100 transition-all cursor-pointer rounded-lg border-[#0000001A] border-solid border-[0.6px] p-2 text-center flex items-center justify-center ${
                    selectedPriceRanges.includes(priceRange)
                      ? "bg-gray-300"
                      : ""
                  }`}
                >
                  {priceRange}
                </p>
              ))}
            </div>
          </div>
          {/* Button to clear all selected filters */}
          <button
            onClick={clearFilters}
            className="mt-4 hover:bg-slate-100 transition-all cursor-pointer rounded-lg border-[#0000001A] border-solid border-[0.6px] p-2 text-center  "
          >
            Clear Filters
          </button>

          {/* Render error message if no results */}
          {noResults && (
            <p className="text-black-500 mt-4">
              No restaurants match the current filter criteria.
            </p>
          )}
        </div>
      </div>
      <div className="w-full">
        <p className="text-lg text-slate-500 mt-6 md:hidden">DELIVERY TIME</p>
        <div className="flex  gap-2 mt-4 md:hidden mb-4 overflow-scroll">
          {uniqueEstimatedTimesArray.map((time, index) => (
            <p
              key={index}
              onClick={() => handleEstimatedTimeSelect(time)}
              className={`text-sm cursor-pointer rounded-lg border-[#0000001A] border-solid border-[0.6px] p-2 text-center flex items-center justify-center ${
                selectedEstimatedTimes.includes(time) ? "bg-gray-300" : ""
              }`}
            >
              {formatEstimatedTime(time)}
            </p>
          ))}
        </div>

        <div className="category-carousel flex gap-4 overflow-scroll md:overflow-auto pb-2">
          {/* Display all categories */}
          {openRestaurants.map((restaurant, index) => (
            <div
              key={index}
              className="cursor-pointer w-40 h-20 flex-shrink-0 border bg-white flex flex-col rounded-lg hover:bg-slate-100 transition-all"
              onClick={() => handleCategorySelect(restaurant.category)}
            >
              <div className="flex-grow px-4 py-2 flex  justify-between">
                <p className="mb-2">{restaurant.category}</p>
                <Image
                  src={urlFor(restaurant.titleImage.asset).url()}
                  alt={restaurant.category}
                  width={40}
                  height={40}
                  className="w-12 h-14 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={clearFilters}
          className="hover:bg-slate-100 mt-4 transition-all cursor-pointer rounded-lg border-[#0000001A] border-solid border-[0.6px] p-2 text-center flex items-center justify-center  md:hidden"
        >
          Clear Filters
        </button>
        <Restaurants
          noResults={noResults}
          filteredRestaurants={filteredRestaurants}
          resturants={resturants}
        />
      </div>
    </div>
  )
}
