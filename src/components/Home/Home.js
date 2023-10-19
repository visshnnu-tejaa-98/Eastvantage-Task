import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState({ apiStatus: 0, data: null, error: null });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://randomuser.me/api");
      //   Destructing name and email
      const { email, name } = res.data?.results[0];
      const modifiedname = `${name.title} ${name.first} ${name.last}`;
      setEmail(email);
      setName(modifiedname);
      //   Storing in to local storage
      localStorage.setItem("randomUser", JSON.stringify(res));
      setData({ apiStatus: 1, data: res, error: null });
    } catch (error) {
      console.log(error);
      setData({ apiStatus: -1, data: null, error: error });
    }
  };
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="w-[400px] h-[200px] p-6 bg-white border border-gray-200 rounded-lg shadow flex justify-center items-center">
        <div>
          {data.apiStatus === 1 && name && (
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 mb-2">
              {name}
            </h5>
          )}
          {data.apiStatus === 1 && email && (
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
              {email}
            </p>
          )}
          {data.apiStatus === 0 && (
            <div className="block">
              <div className="lds-dual-ring"></div>
            </div>
          )}
          {data.apiStatus === -1 && (
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
              Something went wrong!
            </p>
          )}
          {data.apiStatus !== 0 && (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={getData}
            >
              Refresh
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
