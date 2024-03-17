import React from "react";
import blogService from "../../services/blogs";
import { useQuery } from "react-query";

function SoloBlogCard({ id }) {
  const { data, isLoading } = useQuery({
    queryFn: () => blogService.get(id),
    queryKey: ["blog"],
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h3>{data.title}</h3>
      <a href={data.url}>{data.url}</a>
      <p>{data.likes} likes</p>
      <p>added by {data.user.username}</p>
    </div>
  );
}

export default SoloBlogCard;
