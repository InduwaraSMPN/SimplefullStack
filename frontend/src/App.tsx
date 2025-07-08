import React, { useState } from 'react';
import MessageBox from './MessageBox';

interface ServerResponse {
  reply: string;
  timestamp: string;
}

export default function App() {
  const [message, setMessage] = useState<string>('');
  const [serverResponse, setServerResponse] = useState<ServerResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --- Frontend Logic ---

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setServerResponse(null);
    setError(null);

    // In a real app, this URL would be 'http://localhost:3001/api/message'
    // We are simulating the fetch call here for demonstration.
    try {
      const response = await fetch('http://localhost:3001/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong on the server.');
      }
      
      const data = await response.json();
      setServerResponse(data);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen font-sans text-gray-800 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
        
        <header className="bg-gradient-to-r from-blue-600 to-purple-700 p-8 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">Choreo Connect</h1>
          <p className="text-lg opacity-90">Seamless Client-Server Interaction</p>
        </header>

        <div className="p-8">
          
          {/* --- Frontend Section --- */}
          <div className="bg-white">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Send a Message</h2>
            <p className="mb-6 text-gray-600 text-center">
              Experience real-time communication with our powerful backend.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message:
                </label>
                <input
                  id="message"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-xl mb-4 text-gray-800">Server Response:</h3>
              {isLoading && <MessageBox message="Waiting for response..." type="info" />}
              {error && <MessageBox message={`Error: ${error}`} type="error" />}
              {serverResponse && (
                <MessageBox 
                  message={`Reply: ${serverResponse.reply}
Timestamp: ${serverResponse.timestamp}`} 
                  type="success" 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
