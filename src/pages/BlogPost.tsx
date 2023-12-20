import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";

const BlogPost = () => {
  const blogpost: any = useLoaderData();

  return (
    <section>
      <h1>{blogpost?.title}</h1>
      <p>{blogpost?.id}</p>
    </section>
  );
};

export default BlogPost;

export const blogPostLoader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  const res = await fetch(`http://localhost:8000/${slug}`);

  if (!res.ok) {
    throw Error("Could not fetch Blogposts");
  }

  return res.json();
};
