// import axios from "axios";
// import { useQuery } from "react-query";
import { useHeroesData } from "../hooks/useHeroesData";

// type Superhero = {
//   name: string;
//   real_name: string;
//   powers: string[];
//   origin: string;
//   affiliation: string;
// };

const RTKCustomHookHeroes = () => {
  const onSuccess = (data: any) => {
    console.log("Perform effect after fetching data ", data);
  };

  const onError = (error: any) => {
    console.log("Perform effect after encountring error ", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useHeroesData(onSuccess, onError);
  //   const { isLoading, data } = useQuery("super-heroes", () => {
  //     return axios.get("http://localhost:4000/superheroes");
  //   });

  const handleClick = () => {
    refetch();
  };

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) return <h3>Loading...</h3>;
  if (isError) return <h3>{(error as Error).message}</h3>;

  return (
    <>
      <h2>RTK Heroes</h2>
      <button onClick={handleClick}>Fetch Heroes</button>
      {/* {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}

      {data?.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
};

export default RTKCustomHookHeroes;
