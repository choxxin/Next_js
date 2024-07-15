// "use client";

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";

// import Form from "@components/Form";

// const EditPrompt = () => {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const SearchParams = useSearchParams();
//   const promptId = SearchParams.get("id");
//   const [submitting, setIsSubmitting] = useState(false);
//   const [post, setPost] = useState({ prompt: "", tag: "" });

//   useEffect(() => {
//     const getPromptdetail = async () => {
//       const response = await fetch(`/api/prompt/${promptId}`);
//       const data = await response.json();
//       setPost({
//         prompt: data.prompt,
//         tag: data.tag,
//       });
//     };

//     if (promptId) {
//       //   console.log("heelo", data);
//       getPromptdetail();
//     }
//   }, [promptId]);

//   const UpdatePrompt = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     if (!promptId) return alert("Missing PromptId!");
//     try {
//       const response = await fetch(`/api/prompt/${promptId}`, {
//         method: "PATCH",
//         body: JSON.stringify({
//           prompt: post.prompt,

//           tag: post.tag,
//         }),
//       });

//       if (response.ok) {
//         router.push("/");
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Form
//       type="Edit"
//       post={post}
//       setPost={setPost}
//       submitting={submitting}
//       handleSubmit={UpdatePrompt}
//     />
//   );
// };

// export default EditPrompt;

"use client";

import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const getPromptDetail = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) {
      getPromptDetail();
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!promptId) return alert("Missing PromptId!");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

const EditPromptWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditPrompt />
  </Suspense>
);

export default EditPromptWithSuspense;
