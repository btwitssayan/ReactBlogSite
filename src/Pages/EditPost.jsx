import React from "react";
import service from "../appwrite/service";
import { Container, PostForm } from "../components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function EditPost() {
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((res) => {
        if (res) {
          setPost(res);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
