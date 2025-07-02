// import { useHeroData } from "../hooks/useHeroData";
import { useHeroInitialData } from "../hooks/useHeroInitialData";

import { useParams } from "react-router-dom";

const RTKHeroDetail = () => {
  const { heroId } = useParams();

  const { data: hero, isLoading, error } = useHeroInitialData(heroId ?? "");
  //const { data: hero, isLoading, error } = useHeroData(heroId ?? "");

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error?.message}</div>;
  if (!hero) return <div>No hero found.</div>;

  return (
    <div>
      <h2>{hero?.data.name}</h2>
      <p>{hero?.data.real_name}</p>
      <p>{hero?.data.origin}</p>
      <p>{hero?.data.affiliation}</p>
    </div>
  );
};

export default RTKHeroDetail;
