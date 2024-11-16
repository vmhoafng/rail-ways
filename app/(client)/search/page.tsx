import { getTrains } from "@/app/service/train";
import React from "react";
import TrainSearchPage from "./component/TrainSearchPage";

const page = async () => {
  const { result } = await getTrains();
  return <TrainSearchPage trains={result} />;
};

export default page;
