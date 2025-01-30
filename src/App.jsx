import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RefreshButton from "./components/RefreshButton";
import Grid from "./components/Grid";
import Loader from "./components/Loader";

function App() {
  const [events, setEvents] = useLocalStorage("properties",  [
    {
      link: 'https://www.eventbrite.co.uk/e/harare-21-day-kundalini-energy-awakening-meditation-live-recorded-tickets-1078605029679?aff=ebdssbcitybrowse',
      image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F865890869%2F647919780083%2F1%2Foriginal.20241003-160334?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=944a2e9796b91ea1031f0e2e1bf62957',
      title: 'Harare 21 Day- Kundalini Energy Awakening Meditation Live & Recorded',
      date: 'Today • 3:45 AM',
      location: 'Online - Zoom'
    },
    {
      link: 'https://www.eventbrite.co.uk/e/keeping-the-baby-in-mind-brazelton-uk-seminar-in-harare-tickets-1115671666989?aff=ebdssbcitybrowse',
      image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F918234033%2F243946594873%2F1%2Foriginal.20241216-161936?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C24%2C940%2C470&s=c15c5c2d9ae53c0864c844da22b0008b',
      title: 'Keeping the Baby in Mind: Brazelton UK seminar in Harare',
      date: 'Thu, Feb 27 • 9:00 AM',
      location: 'The Bronte Garden Hotel'
    },
    {
      link: 'https://www.eventbrite.com/e/leadership-in-tech-symposium-tickets-1220504324289?aff=ebdssbcitybrowse',
      image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F943613833%2F2549574030511%2F1%2Foriginal.20250124-065907?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=ecdfc523f8f4dd99a63f464eb25331b6',
      title: 'Leadership In Tech Symposium',
      date: 'Sat, Mar 29 • 8:30 AM',
      location: 'Cresta Lodge Harare'
    },
    {
      link: 'https://www.eventbrite.co.uk/e/level-up-ladies-luncheon-tickets-943571687317?aff=ebdssbcitybrowse',
      image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F803566499%2F263344186137%2F1%2Foriginal.20240708-145844?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C1500%2C3000%2C1500&s=4d1b6232125ed194a3f049131e319a1f',
      title: 'Level Up Ladies Luncheon',
      date: 'Sat, May 3 • 2:00 PM',
      location: 'Palm Estate'
    },
    {
      link: 'https://www.eventbrite.co.uk/e/harare-21-day-kundalini-energy-awakening-meditation-live-recorded-tickets-1078605029679?aff=ebdssbcitybrowse',
      image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F865890869%2F647919780083%2F1%2Foriginal.20241003-160334?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=944a2e9796b91ea1031f0e2e1bf62957',
      title: 'Harare 21 Day- Kundalini Energy Awakening Meditation Live & Recorded',
      date: 'Today • 3:45 AM',
      location: 'Online - Zoom'
    },
    {
      link: 'https://www.eventbrite.co.uk/e/keeping-the-baby-in-mind-brazelton-uk-seminar-in-harare-tickets-1115671666989?aff=ebdssbcitybrowse',
      image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F918234033%2F243946594873%2F1%2Foriginal.20241216-161936?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C24%2C940%2C470&s=c15c5c2d9ae53c0864c844da22b0008b',
      title: 'Keeping the Baby in Mind: Brazelton UK seminar in Harare',
      date: 'Thu, Feb 27 •  9:00 AM ',
      location: 'The Bronte Garden Hotel'
    },
    {
      link: 'https://www.eventbrite.com/e/leadership-in-tech-symposium-tickets-1220504324289?aff=ebdssbcitybrowse',
      image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F943613833%2F2549574030511%2F1%2Foriginal.20250124-065907?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=ecdfc523f8f4dd99a63f464eb25331b6',
      title: 'Leadership In Tech Symposium',
      date: 'Sat, Mar 29 •  8:30 AM ',
      location: 'Cresta Lodge Harare'
    },
    {
      link: 'https://www.eventbrite.co.uk/e/level-up-ladies-luncheon-tickets-943571687317?aff=ebdssbcitybrowse',
      image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F803566499%2F263344186137%2F1%2Foriginal.20240708-145844?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C1500%2C3000%2C1500&s=4d1b6232125ed194a3f049131e319a1f',
      title: 'Level Up Ladies Luncheon',
      date: 'Sat, May 3 •  2:00 PM ',
      location: 'Palm Estate'
    },
    {
      link: 'https://allevents.in/harare/join-our-ultimate-women%E2%80%99s-adventure-in-zimbabwe/200027641078324',
      image: 'https://cdn-az.allevents.in/events7/banners/c9dcec639802ff292fbcf9e880bfd1577af3465231a27cb9b439fe9a64971159-rimg-w592-h960-dc4b411f-gmir?v=1735628774',
      title: 'Join Our Ultimate Women’s Adventure in Zimbabwe!',
      date: 'SAT, 01 FEB',
      location: 'Greenwood Park'
    },
    {
      link: 'N/A',
      image: 'N/A',
      title: 'N/A',
      date: 'N/A',
      location: 'N/A'
    },
    {
      link: 'https://allevents.in/harare/sunshine-city-festival-2025/200027552085354',
      image: 'https://cdn-az.allevents.in/events9/banners/4de0db5049b0d7f4787d1a9c4d68be2d976e3f0b2f8f77f989e1c62231dabe76-rimg-w1200-h675-dc01f3fe-gmir?v=1737801978',
      title: 'Sunshine City Festival 2025',
      date: '24-25 MAY',
      location: 'Alexandra Sports Club'
    },
    {
      link: 'https://allevents.in/harare/zimbabwe-study-abroad-education-expo/200027700561426',
      image: 'https://cdn-az.allevents.in/events5/banners/4d0c4ef2e6862bce805340da462faad59d5078157e6160cdafe27289afb6d42f-rimg-w763-h1080-dc024959-gmir?v=1737792424',
      title: 'Zimbabwe (Study Abroad) Education Expo',
      date: 'SAT, 08 FEB',
      location: 'HICC, Rainbow Towers, Harare'
    },
    {
      link: 'https://allevents.in/harare/dubai-property-investment-seminar/200027745317539',
      image: 'https://cdn-az.allevents.in/events1/banners/b7eabf6a1b81bd7e5bca4b73c6e2fb33dc10dd7e85c167f51fb47001507cf4c1-rimg-w848-h1131-dc2b1e18-gmir?v=1737801823',
      title: 'DUBAI PROPERTY INVESTMENT SEMINAR',
      date: 'MON, 27 JAN',
      location: 'HICC, Rainbow Towers, Harare'
    },
    {
      link: 'https://allevents.in/harare/cine-club-||-french-comedy-with-english-subtitles/200027757574104',
      image: 'https://cdn-az.allevents.in/events3/banners/b14db50807c489028e6e7fee36417e78dddabbb3ea209ccee0f7bc0b9e268caf-rimg-w1200-h1200-dcffffff-gmir?v=1737423664',
      title: 'CINE CLUB || French Comedy with English Subtitles',
      date: 'WED, 29 JAN',
      location: '328 Herbert Chitepo Avenue, Harare, Zimbabwe, 921 Harare, Zimbabwe'
    },
    {
      link: 'N/A',
      image: 'N/A',
      title: 'N/A',
      date: 'N/A',
      location: 'N/A'
    },
    {
      link: 'https://allevents.in/harare/reggae-brunch-zw-1st-edition/200027722425300',
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      title: 'Reggae Brunch ZW 1st edition',
      date: '01-02 FEB',
      location: 'Sherwood Golf Club'
    },
    {
      link: 'https://allevents.in/harare/oliver-mtukudzi-memorial-half-marathon/200027757575230',
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      title: 'Oliver Mtukudzi Memorial Half Marathon',
      date: 'SUN, 02 FEB',
      location: 'Pakare Paye Arts Centre'
    },
    {
      link: 'https://allevents.in/harare/zimreal-property-investment-forum/3700027482897409',
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      title: 'ZimReal Property Investment Forum',
      date: 'THU, 28 AUG',
      location: 'Golden Conifer'
    },
    {
      link: 'https://allevents.in/harare/passion-bakers-workshop-vol-7/200027675019301',
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      title: 'Passion Bakers Workshop Vol 7',
      date: 'SAT, 29 MAR',
      location: 'Rainbow Towers Hotel'
    },
    {
      link: 'https://allevents.in/harare/level-up-ladies-luncheon/10000943571687317',
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      title: 'Level Up Ladies Luncheon',
      date: 'SAT, 03 MAY',
      location: 'Palm Estate'
    },
    {
      link: 'N/A',
      image: 'N/A',
      title: 'N/A',
      date: 'N/A',
      location: 'N/A'
    },
    {
      link: 'https://allevents.in/harare/prayer-board-party/200027744757627',
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      title: 'Prayer Board Party',
      date: 'SAT, 01 FEB',
      location: 'Harare Drive'
    },
    {
      link: 'https://allevents.in/harare/graduation-and-prize-giving-dinner/200027757573801',
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      title: 'Graduation & Prize Giving Dinner',
      date: 'SAT, 01 FEB',
      location: 'Crowne Plaza Monomotapa'
    },
    {
      link: 'https://allevents.in/harare/discovery-innovation-and-progress-in-baking/200027757574003',
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      title: 'Discovery, Innovation, and Progress in Baking',
      date: 'SAT, 01 FEB',
      location: 'Longcheng Amusement Park'
    },
    {
      link: 'https://allevents.in/harare/young-and-chosen-africa-tour/200027677406959',
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      title: 'Young and Chosen Africa Tour',
      date: 'FRI, 21 FEB',
      location: 'Harare Showground Eastend Hall'
    },
    {
      link: 'https://allevents.in/harare/valentines-food-and-wine-dinner/200027722424052',
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      title: "Valentine's Food And Wine Dinner",
      date: 'FRI, 14 FEB',
      location: 'Cresta Oasis Hotel (Harare, Zimbabwe)'
    }
  ])
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