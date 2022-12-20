import { useState } from "react";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { InferGetStaticPropsType } from "next";
import NavBar from "../components/NavBar";

export const getStaticProps: GetStaticProps = async () => {
  const feedRaw = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  const feed = JSON.parse(JSON.stringify(feedRaw));

  return {
    props: { feed },
    revalidate: 20,
  };
};

type Props = {
  feed: PostProps[];
};

function Index(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const [feed, setFeed] = useState(props.feed);

  return (
    <div>
      <header className="mb-5 mt-5">
        <NavBar />
      </header>
      <main className="flex flex-col">
        {props.feed.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
      </main>
    </div>
  );
}

export default Index;
