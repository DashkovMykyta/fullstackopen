import React, { useState } from "react";
import { useField } from "../hooks/useField";
import { useMutation } from "react-query";
import blogService from "../services/blogs";
import { useNotification } from "../context/NotificationProvider";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Comments({ blog }) {
  const [comments, setComments] = useState(blog?.comments || []);
  const content = useField("text");
  const notification = useNotification();

  const addComment = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (response) => {
      setComments(comments.concat({ content: response.content }));
      notification("comment added");
      content.reset();
    },
    onError: (error) => {
      notification(error.response.data.error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      addComment.mutate({
        blogId: blog.id,
        content: content.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8">
      <h2>Comments</h2>
      <form onSubmit={handleSubmit} className="flex flex-row gap-2">
        <Input
          type={content.type}
          value={content.value}
          onChange={content.onChange}
        />
        <Button>Add</Button>
      </form>

      <ul className="w-full mt-4 text-sm font-medium">
        {comments?.map((comment, index) => (
          <li
            key={index}
            className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
          >
            {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
