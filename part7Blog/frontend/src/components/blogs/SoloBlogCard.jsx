import React from "react";
import blogService from "../../services/blogs";
import { useQuery } from "react-query";
import Comments from "../Comments";

function SoloBlogCard({ id }) {
  const { data, isLoading } = useQuery({
    queryFn: () => blogService.get(id),
    queryKey: ["blog"],
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-2xl font-semibold">{data.title}</h3>
        <p className="">
          {data.likes}
          <span className="text-red-500 text-md ml-1">♡</span>
        </p>
      </div>
      <p className="text-gray-500 mb-4">added by {data.user.username}</p>
      <a href={data.url} className="hover:underline">
        {data.url}
      </a>
      <Comments blog={data} />
    </div>
  );
}

export default SoloBlogCard;
