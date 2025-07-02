import axios from "axios";
import { useEffect, useState } from "react";

type Superhero = {
  name: string;
  real_name: string;
  powers: string[];
  origin: string;
  affiliation: string;
};

const Heroes = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Superhero[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <h3>Loading...</h3>;

  if (error) return <h3>{error}</h3>;

  return (
    <>
      <h2>Super Hero Page</h2>
      {data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

export default Heroes;
