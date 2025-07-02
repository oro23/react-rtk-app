import axios from "axios";
import { useQuery } from "react-query";

type DependentQueryProps = {
  email: string;
};

type User = {
  id: string;
  channelId: string;
};

type Channel = {
  id: string;
  courses: string[];
};

const fetechUserByEmail = (email: string) => {
  return axios.get<User>(`http://localhost:4000/users/${email}`);
};

const fetechCoursesByChannelId = (channelId: string) => {
  return axios.get<Channel>(`http://localhost:4000/channels/${channelId}`);
};

const DependentQuery = ({ email }: DependentQueryProps) => {
  const { data: user } = useQuery(
    ["user", email],
    () => fetechUserByEmail(email),
    {
      enabled: !!email,
    }
  );

  const channelId = user?.data.channelId;

  const { data: channel } = useQuery(
    ["courses", channelId],
    () => fetechCoursesByChannelId(channelId!),
    {
      enabled: !!channelId,
    }
  );

  console.log(channel?.data.courses);
  return (
    <div>
      {channel?.data?.courses?.map((course) => (
        <div key={course}>{course}</div>
      ))}
    </div>
  );
};

export default DependentQuery;
