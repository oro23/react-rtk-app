import axios from "axios";
import { useQuery } from "react-query";

const fetchHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

const Parallel = () => {
  const { data: heores } = useQuery("super-heroes", fetchHeroes);
  const { data: friends } = useQuery("friends", fetchFriends);

  console.log(heores);
  console.log(friends);

  return <div></div>;
};

export default Parallel;
