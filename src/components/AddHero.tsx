import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useAddHeroData } from "../hooks/useAddHeroes";

type Superhero = {
  id: number;
  name: string;
  real_name: string;
  powers: string[];
  origin: string;
  affiliation: string;
};

const AddHero = () => {
  const [name, setName] = useState("");
  const [realName, setRealName] = useState("");
  const [origin, setOrigin] = useState("");
  const [powers, setPowers] = useState([]);
  const [affiliation, setAffiliation] = useState("");

  const fetchHeroes = () => {
    return axios.get<Superhero[]>("http://localhost:4000/superheroes");
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
      onSuccess,
      onError,
    }
  );

  const { mutate: addHero } = useAddHeroData();

  const handleSubmit = () => {
    const hero = { name, realName, origin, powers, affiliation };
    addHero(hero);
    // refetch();
  };

  if (isLoading || isFetching) return <h3>Loading...</h3>;
  if (isError) return <h3>{(error as Error).message}</h3>;

  return (
    <>
      <h2>RTK Heroes</h2>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>Name: </th>
            <td>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>

            <th>Real name: </th>
            <td>
              <input
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
              />
            </td>

            <th>Origin: </th>
            <td>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </td>

            <th>Affiliation: </th>
            <td>
              <input
                type="text"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
              />
            </td>
            <td>
              <button onClick={handleSubmit}>Add Hero</button>
            </td>
          </tr>
        </tbody>
      </table>
      {data?.data.map((hero: any) => {
        return (
          <div key={hero.name}>
            <div>{hero.name}</div>
          </div>
        );
      })}
    </>
  );
};

export default AddHero;
