import axios from "axios";
import { useQuery } from "react-query";

type Superhero = {
  name: string;
  real_name: string;
  powers: string[];
  origin: string;
  affiliation: string;
};

 const fetchHeroes = () => {
    return axios.get<Superhero[]>("http://localhost:4000/superheroes");
  };

export const useHeroesData =(onSuccess:any,onError:any) =>{
return useQuery(
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
      select: (data) => {
        const heroNames = data.data.map((hero) => hero.name);
        // console.log(data);
        // console.log(heroNames);
        return heroNames;
      },
    }
  )
}