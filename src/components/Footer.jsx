import React from "react";

function Footer() {
  return (
    <footer className="bg-blue-500 w-full py-4 text-white text-center">
      <p>
        &copy; {new Date().getFullYear()} Harare Scraper Scraper by{" "}
        <a href="https://mihailgaberov.com">Mihail Gaberov</a>{" "}
      </p>
    </footer>
  );
}

export default Footer;