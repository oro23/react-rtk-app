import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { Fragment } from "react/jsx-runtime";

type Color = {
  id: number;
  name: string;
  hex: string;
  rgb: string;
  category: string;
};

const fetchColors = ({ pageParam = 1 }: { pageParam?: number }) => {
  return axios.get<Color[]>(
    `http://localhost:4000/colors?_limit=2&_page=${pageParam}`
  );
};

const InfiniteQuery = () => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (lastPage, allPages) => {
      //   if (pages.length < 10) return pages.length + 1;
      //   else return pages.length + 1;
      return lastPage.data.length === 2 ? allPages.length + 1 : undefined;
    },
  });

  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Error....</div>;

  console.log(data);

  return (
    <>
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.map((color) => (
            <div key={color.id} style={{ marginBottom: "10px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                  backgroundColor: color.hex,
                  marginRight: "10px",
                  marginTop: "5px",
                }}
              ></span>
              <span>{color.name}</span>
            </div>
          ))}
        </Fragment>
      ))}

      <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
        Load more
      </button>

      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default InfiniteQuery;
