import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

  const addSuperHero =(hero) =>{
    return axios.post('http://localhost:4000/superheroes', hero);
  }

export const useAddHeroes =(onSuccess:any,onError:any) =>{
return useQuery(
    "super-heroes",
    fetchHeroes,
    {
      onSuccess,
      onError,
      select: (data) => {
        const heroNames = data.data.map((hero) => hero.name);
        return heroNames;
      },
    }
  )
}

export const useAddHeroData = () =>{
    const queryClient = useQueryClient();
    
    return useMutation(addSuperHero, {
        // onSuccess:() =>{
        //     queryClient.invalidateQueries('super-heroes')
        // }
        onSuccess:(data) =>{
            queryClient.setQueryData<{ data: Superhero[] } | undefined>('super-heroes',(oldQueryData) =>{
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data.data]
                }
            })
        }
    })
}