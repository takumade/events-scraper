import React from "react";

function Grid({ events }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
      {events?.map((event, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4"
        >
          <img
            className="rounded-lg h-48 w-full"
            src={event.image}
            alt={event.title}
          />

          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-500 hover:underline"
          >
            <h3 className="text-blue-950 text-lg font-semibold mb-2 mt-2 capitalize">
              {event.title.substr(0, 32) + (event.title.length > 32 ? "..." : "")}
            </h3>
          </a>
          <p className="text-gray-600 flex"><LocationIcon/> {event.location}</p>
          <p className="text-gray-600 flex mt-2 capitalize"><DateIcon/> {event.date}</p>
        </div>
      ))}
    </div>
  );
}

export default Grid;

const LocationIcon = () => {
    return (
        <svg className="w-6 h-6 mr-2" dataSlot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    );
}

const DateIcon = () => {
    return (
        <svg className="w-6 h-6 mr-2" dataSlot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
    );
}
