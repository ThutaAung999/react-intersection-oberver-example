
import { useInView } from "react-intersection-observer";
import "./App.css";
import DittoCard from "./components/DittoCard";
import { Ditto } from "./types/ditto";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function App() {
  
  const { ref, inView} = useInView({
    
  });

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

 // console.log(data);

  const content = data?.pages.map((dittos) =>
    dittos.map((ditto: Ditto,index:number) => {
      if(dittos.length === index+1){
        return <DittoCard innerRef={ref} key={ditto.id} ditto={ditto} />;
      }
      return <DittoCard key={ditto.id} ditto={ditto} />;
    })
  );


  useEffect(() => {
    if(inView && hasNextPage){
    console.log("Fire");
    fetchNextPage();
    }
  }, [ inView,hasNextPage,fetchNextPage]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error :{error.message}</div>;

  return (
    <div className="app">
      {content}
      {/* <button
      ref={ref}
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? "Loading more.."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button> */}
      {isFetchingNextPage && <div>Loading...</div>}
    </div>
  );
}

export default App;
