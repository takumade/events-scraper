import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RefreshButton from "./components/RefreshButton";
import Grid from "./components/Grid";
import Loader from "./components/Loader";

function App() {
  const [events, setEvents] = useLocalStorage("properties", []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    setEvents([]);

    try {
      const response = await axios.get("http://localhost:5001/scrape");
      if (response.data.length === 0) {
        throw new Error("No events found");
      }
      setEvents(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to fetch events. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (events.length === 0) {
    //   fetchListings();
    // }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />
      <RefreshButton callback={fetchListings} loading={loading} />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 relative">
        {error && <p className="text-red-500">{error}</p>}
        {loading ? <Loader /> : <Grid events={events} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;