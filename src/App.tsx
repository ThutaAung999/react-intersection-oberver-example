import { useEffect, useState } from "react";
import "./App.css";
import DittoCard from "./components/DittoCard";
import { Ditto } from "./types/ditto";
import { useInfiniteQuery } from "@tanstack/react-query";

function App() {
  const [dittos, setDittos] = useState<Ditto[]>([]);

  const getDittos = async ({ pageParam }: { pageParam: number }) => {
    // const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");

    // console.log(props);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`
    );
    return response.json();
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: getDittos,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  console.log(data);

  const content = data?.pages.map((dittos) =>
    dittos.map((ditto: Ditto) => {
      return <DittoCard key={ditto.id} ditto={ditto} />;
    })
  );

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error :{error.message}</div>;

  return (
    <div className="app">
      {content}
      <button
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? "Loading more.."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
}

export default App;
