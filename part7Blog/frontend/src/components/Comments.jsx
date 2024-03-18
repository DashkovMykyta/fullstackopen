import React, { useState } from "react";
import { useField } from "../hooks/useField";
import { useMutation } from "react-query";
import blogService from "../services/blogs";
import { useNotification } from "../context/NotificationProvider";

export default function Comments({ blog }) {
  const [comments, setComments] = useState(blog?.comments || []);
  const content = useField("text");
  const notification = useNotification();

  const addComment = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (response) => {
      setComments(comments.concat(response));
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
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type={content.type}
          value={content.value}
          onChange={content.onChange}
        />
        <button>add comment</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
}
