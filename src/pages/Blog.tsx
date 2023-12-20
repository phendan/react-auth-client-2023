import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

type Blogpost = {
  id: number;
  title: string;
  slug: string;
};

const Blog = () => {
  const blogposts = useLoaderData() as Blogpost[];

  return (
    <>
      {blogposts
        ? blogposts.map((post) => {
            return (
              <div key={post.id}>
                <Link to={post.slug}>{post.title}</Link>
                <br />
              </div>
            );
          })
        : null}
    </>
  );
};

export default Blog;

export const blogLoader = async () => {
  const res = await fetch("http://localhost:8000/blogposts");

  if (!res.ok) {
    throw Error("Could not fetch Blogposts");
  }

  return res.json();
};
