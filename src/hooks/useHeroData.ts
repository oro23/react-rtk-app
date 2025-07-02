import axios from "axios";
import { useQuery } from "react-query";

// type Superhero = {
// id: number,
//   name: string;
//   real_name: string;
//   powers: string[];
//   origin: string;
//   affiliation: string;
// };

 const fetchHero = (heroId:any) => {
    //return axios.get<Superhero[]>(`http://localhost:4000/superheroes/${heroId}`);
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
  };

//    const fetchHero = ({queryKey}: any) => {
//     console.log(queryKey)
//     const heroId = queryKey[1];
//     //return axios.get<Superhero[]>(`http://localhost:4000/superheroes/${heroId}`);
//     return axios.get(`http://localhost:4000/superheroes/${heroId}`);
//   };


export const useHeroData = (heroId:any) => {
 return useQuery(['super-hero', heroId], () =>fetchHero(heroId));
}
