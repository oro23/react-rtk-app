import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

type Superhero = {
  id: number;
  name: string;
  real_name: string;
  powers: string[];
  origin: string;
  affiliation: string;
};

const RTKHeroes = () => {
  const fetchHeroes = () => {
    return axios.get<Superhero[]>("http://localhost:4000/superheroes");
    // const response = axios.get<Superhero[]>(
    //   "http://localhost:4000/superheroes"
    // );
    // return response.data;
  };

  const onSuccess = (data: any) => {
    console.log("Perform effect after fetching data ", data);
  };

  const onError = (error: any) => {
    console.log("Perform effect after encountring error ", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchHeroes,
    {
      // cacheTime: 5000,
      // staleTime: 50,
      // refetchOnMount: true,
      //   refetchOnWindowFocus: true,
      // refetchInterval: 2000,
      // refetchIntervalInBackground: true,
      // enabled: false,
      onSuccess,
      onError,
      // select: (data) => {
      //   const heroNames = data.data.map((hero) => hero.name);
      //   // console.log(data);
      //   // console.log(heroNames);
      //   return heroNames;
      // },
    }
  );
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

      {data?.data.map((hero: any) => {
        return (
          <div key={hero.name}>
            <Link to={`/rtk-hero-detail/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}

      {/* {data?.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};

export default RTKHeroes;
