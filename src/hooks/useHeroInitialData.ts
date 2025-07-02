import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

// type Superhero = {
// id: number,
//   name: string;
//   real_name: string;
//   powers: string[];
//   origin: string;
//   affiliation: string;
// };

//  const fetchHero = (heroId:any) => {
//     //return axios.get<Superhero[]>(`http://localhost:4000/superheroes/${heroId}`);
//     return axios.get(`http://localhost:4000/superheroes/${heroId}`);
//   };

//    const fetchHero = ({queryKey}: any) => {
//     console.log(queryKey)
//     const heroId = queryKey[1];
//     //return axios.get<Superhero[]>(`http://localhost:4000/superheroes/${heroId}`);
//     return axios.get(`http://localhost:4000/superheroes/${heroId}`);
//   };

const fetchHero = ({queryKey}: any) => {
  const heroId = queryKey[1];
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
  };

export const useHeroInitialData = (heroId:any) => {
  console.log('QC')
  const queryClient = useQueryClient();
 return useQuery(['super-hero', heroId], fetchHero, {
  initialData: () =>{
    const hero = queryClient.getQueryData('super-heroes')?.data?.find(hero => hero.id === parseInt(heroId))
    if(hero)
      return { data : hero }
    else { return undefined }
  }
 });
}
