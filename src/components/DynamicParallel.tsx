import axios from "axios";
import { useQueries } from "react-query";

const fetchSuperHero = (heroId: number) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

interface DynamicParallelProps {
  heroIds: number[];
}

const DynamicParallel = ({ heroIds }: DynamicParallelProps) => {
  const result = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log(result);

  return <></>;
};

export default DynamicParallel;
