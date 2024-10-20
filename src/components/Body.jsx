import React, { useEffect, useState } from "react";
import DateRangePicker from "./DateRangePicker";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../utils/appDataSlice";
const Body = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let queryFilters = useSelector((state) => state.appData.filters);
  // const location = useLocation();
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("start") || null;
  const endDate = searchParams.get("end") || null;
  const age = searchParams.get("age") || null;
  const gender = searchParams.get("gender") || null;
  const bar = searchParams.get("bar") || null;
  if (!queryFilters) {
    const filter = { startDate, endDate, age, gender, bar };
    queryFilters = { startDate, endDate, age, gender, bar };
    dispatch(setFilters(filter));
    console.log("query", queryFilters);
  }

  useEffect(() => {
    // get cookies and rewrite requests
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("Authorization="))
      ?.split("=")[1];
    console.log("cokkiefrom body", cookieValue);
    if (!cookieValue) {
      navigate("/");
      return;
    }
    //  fetchDataHandler();
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [queryFilters]);

  async function fetchDataHandler() {
    const { startDate, endDate, age, gender, bar } = queryFilters;
    navigate(
      `?start=${startDate}&end=${endDate}&age=${age}&gender=${gender}&bar=${bar}`,
      { replace: true }
    );
    console.log(queryFilters);
    try {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("Authorization="))
        ?.split("=")[1];
      const res1 = await fetch(
        `https://data-app-backend.vercel.app/data/search?start=${startDate}&end=${endDate}&age=${age}&gender=${gender}&bar=${bar}`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            "Authorization": `${cookieValue}`, // Authorization header with Bearer token
            "Content-Type": "application/json", // Specify content type if needed
          },
        }
      );
      const json1 = await res1.json();
      console.log("json1", json1.filterSumValues);
      setData(json1.filterSumValues);
    } catch (error) {
      console.log(error);
    }
  }

  if (data.length == 0) {
    return <div>
            <DateRangePicker />
            <h1 className="text-5xl text-center">No data found</h1>
    </div>;
  }

  return (
    <div>
      <h1 className="text-4xl text-center mt-3">Data app In react</h1>
      <DateRangePicker />
      <div className="flex flex-wrap w-full h-[50vh] items-center justify-center">
        <div className="w-[600px]">
          <BarChart barData={data} />
        </div>
        <div className="w-[600px]">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Body;
