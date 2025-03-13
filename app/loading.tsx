import React from "react"

export default function Loading() {
  // Array of loading messages that can be randomly selected
  const loadingMessages = [
    "Building something amazing just for you...",
    "Optimizing pixels and performance...",
    "Crafting digital experiences with care..."
  ]
  
  // Select a random message
  const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 font-pixel">Loading...</p>
      
      <div className="mt-6 max-w-md text-center">
        <p className="text-dracula-yellow font-mono italic">{randomMessage}</p>
      </div>
    </div>
  )
}

