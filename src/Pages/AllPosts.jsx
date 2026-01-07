import React from "react";
import service from "../appwrite/service";
import { Container, PostCard } from "../components";
import { useState, useEffect } from "react";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((res) => {
      if (res) setPosts(res.rows);
    });
  }, []); // <-- Add empty array
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
