import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

type Color = {
  id: number;
  name: string;
  hex: string;
  rgb: string;
  category: string;
};

const fetchColors = (pageNumber: number) => {
  return axios.get<Color[]>(
    `http://localhost:4000/colors?_limit=2&_page=${pageNumber}`
  );
};

export default function PaginatedQuery() {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isError } = useQuery(["colors", pageNumber], () =>
    fetchColors(pageNumber)
  );

  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Error...</div>;

  return (
    <>
      {data?.data.map((color) => (
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
      <button
        onClick={() => setPageNumber((page) => page - 1)}
        disabled={pageNumber === 1}
      >
        Previous page
      </button>
      <button
        onClick={() => setPageNumber((page) => page + 1)}
        disabled={pageNumber === 10}
      >
        Next page
      </button>
    </>
  );
}
