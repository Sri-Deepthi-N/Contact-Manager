import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/list");
        const filteredContacts = response.data.filter((contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredContacts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, [searchTerm]);

  return (
    <div className="search-container-wrapper">
      <div className="search-container">
        <h2>Search Contacts</h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="results">
          {searchResults.map((user) => (
            <div key={user.id}>
              <Link to={`/${user._id}`}><button className="btn">{user.name}</button></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
