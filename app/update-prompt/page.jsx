"use client";

import { useEffect, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })
    useEffect(()=>{
        const getPrompt = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            // console.log(data)
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }
         if(promptId)  getPrompt()

    },[promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body:JSON.stringify({ 
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })
            // console.log("working..")
            if (res.ok) {
                router.back()
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setSubmitting(false);
        }
    }
    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
};

export default UpdatePrompt;

