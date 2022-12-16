import { PostProps } from "../../components/Post"
import prisma from "../../lib/prisma"
import ReactMarkdown from "react-markdown"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const postRaw = await prisma.post.findUnique({
        where: {
            id: String(params?.id)
        },
        include: {
            author: {
                select: { name: true, email: true}
            }
        }
    })

    const post = JSON.parse(JSON.stringify(postRaw))

    return {
        props: post
    }
}

function Post(props: PostProps) {
    return (
        <div className="flex justify-center flex-col items-center">
            <h1 className="font-semibold text-7xl m-5">{props?.title}</h1>
            <ReactMarkdown children={props.content} />
        </div>
    )
}

export default Post