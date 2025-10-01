import React from 'react'
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router'

export enum EventStatus {
  Upcoming = 'Upcoming',
  Past = 'Past',
  Live = 'Live'
}

interface EventCardProps {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  price: string
  status?: EventStatus
}

function EventCard({ 
  id, 
  title, 
  description, 
  date, 
  time, 
  location, 
  image, 
  price,
  status
}: EventCardProps) {
  return (
    <Link to={`/event/${id}`} className="block h-full">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col group">
        {/* Event Image */}
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-theme-clr text-black px-3 py-1 rounded-full text-sm font-semibold">
            {location}
          </span>
        </div>

        {/* Status Badge */}
        {
          status && (
            <div className="absolute bottom-4 left-4">
              <span className={`${status === EventStatus.Upcoming ? 'bg-green-500' : status === EventStatus.Past ? 'bg-gray-500' : 'bg-red-500'} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                {status}
              </span>
            </div>
          )
        }
      </div>

      {/* Event Details */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Event Title */}
        <h3 className="text-xl font-bold font-primary text-gray-900 mb-3 line-clamp-2 flex-shrink-0 group-hover:text-theme-clr transition-colors">
          {title}
        </h3>
        
        {/* Event Description */}
        <p className="text-gray-600 mb-4 font-tertiary line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Event Info */}
        <div className="flex gap-3 justify-between flex-shrink-0">
          {/* Date */}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-theme-clr" />
            <span className="text-gray-700 font-medium">{date}</span>
          </div>
          
          {/* Time */}
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-theme-clr" />
            <span className="text-gray-700 font-medium">{time}</span>
          </div>
          
          {/* Location */}
          {/* <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-theme-clr" />
            <span className="text-gray-700 font-medium">{location}</span>
          </div> */}
        </div>

        {/* Learn More Button */}
        <div className="mt-auto pt-4">
          <div className="w-full bg-theme-clr hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
            Learn More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
      </div>
    </Link>
  )
}

export default EventCard