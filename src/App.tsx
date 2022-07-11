import React, { useEffect, useState } from "react";
import "./App.css";
import { client } from "./utils/axios";

interface IDataRes {
  circumference_of_the_sun: string;
  pi: string;
}
const REFRESH_INTERVAL = 10000;

function App() {
  const [state, setState] = useState<IDataRes | undefined>({
    circumference_of_the_sun: "0",
    pi: "0",
  });
  const fetchSunCircumference = async () => {
    try {
      const { data } = await client.get<IDataRes>(
        "/calculate_sun_circumference"
      );
      setState(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchSunCircumference();
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="sticky text-center py-2 px-4 bg-gray-700">
        <p className="font-serif text-base text-gray-400">{`Refresh every ${
          REFRESH_INTERVAL / 1000
        } seconds`}</p>
      </div>
      <div className="flex justify-center items-center flex-col mb-12 px-4 py-2 ">
        <h1 className="text-slate-100 font-bold text-3xl word tracking-wide">
          The circumference of the{" "}
          <span className="text-4xl animate-spin">☀️</span> :
        </h1>
        <p className="font-serif text-slate-200 text-4xl break-all">
          {state?.circumference_of_the_sun}{" "}
          <span className="text-xl text-gray-400">km</span>
        </p>
      </div>
      <div className="flex justify-center items-center flex-col px-4 py-2">
        <h1 className="text-slate-100 font-bold text-3xl word tracking-wide text-center">
          The value of <span className="text-4xl text-indigo-400">𝛑</span> :
        </h1>
        <p className="font-serif text-slate-200 text-4xl break-all">
          {state?.pi}
        </p>
      </div>
    </div>
  );
}

export default App;
