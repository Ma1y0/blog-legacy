import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Router from "next/router";

export type PostProps =  {
    id: string;
    title: string;
    author: {
        name: string;
        email: string;
    } | null;
    content: string;
    published: boolean;
}

function Post(post: PostProps) {
    const { author, title, content, publishedm, id } = post.post 

    const authorName = author ? author.name : "Unknown author"

    return (
        <div onClick={() => Router.push("/posts/[id]", `/posts/${id}`)} className="p-6 bg-gray-900 mb-2 mt-2 ml-6 mr-6">
            <h2 className="font-semibold text-5xl mb-2">{title}</h2>
            <small className="font-semibold text-gray-400"> By {authorName}</small>
        </div>
    )
}

export default Post