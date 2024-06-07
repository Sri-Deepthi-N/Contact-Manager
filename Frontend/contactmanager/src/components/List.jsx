import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const List = () => {
  const [list, setList] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/list");
        setList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="cont">
      <h1 className="title">Contacts</h1>
      <div className="box">
        <Link to={"/form"}>
          <button className="icon"><FaPlus /></button>
        </Link>
        <Link to={"/search"}>
          <button className="icon"><FaMagnifyingGlass /></button>
        </Link>
      </div>
      <div className="list">
        {list && list.map((user) => (
          <div key={user._id}>
            <Link to={`/${user._id}`}>
              <button className="bton">{user.name}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
