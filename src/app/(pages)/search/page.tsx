"use client";

import React from "react";
import { useCamps } from "@/app/queries/useQueries";
import { SearchParams } from "../../../type/map";
import { LoadingSpinner } from "./components/loading/LoadingSpinner";
import { SearchResults } from "./components/SearchResults";
import { Map } from "./components/map/Map";

export default function SearchPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const { keyword, region } = searchParams;
  const { data: camps = [], isLoading } = useCamps(keyword, region);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex">
      <SearchResults camps={camps} />
      <Map />
    </div>
  );
}
