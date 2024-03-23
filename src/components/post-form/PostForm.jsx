import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import dbService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Input, Select, RTE } from '../index'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);


    const submit = async (data) => {
        
        //update kr rhe hai post ko and post exist krta hai
        if (post) {

            //image update kr rhe hai ya nhi kr rhe hai -> ternary operation
            const file = data.image[0] ? await dbService.uploadFile(data.image[0]) : null;

            //purani image ko delte kregye
            if (file) {
                dbService.deleteFile(post.featuredImage)
            }

            //yha hmm jo bhi update kr rhe hai sab update kr diya hmne
            const dbPost = await dbService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            //update krke usse usi post pe bhej diya
            if (dbPost) navigate(`/post/${dbPost.$id}`);


        } else {  //new blog post crete krna hai


            //sabse phele file upload kregye
            const file = await dbService.uploadFile(data.image[0]);

            if (file) {
                //file id ko update kregye data mai
                const fileId = file.$id;
                data.featuredImage = fileId;

                if (userData && userData.$id) {
                    console.log("User ID:", userData.$id);
                } else {
                    console.log("User ID is not available yet");
                }

                //create kr dege new post
                console.log(userData)
                const dbPost = await dbService.createPost({
                    ...data,
                    userId: userData.$id
                });

                if (dbPost)
                {
                    navigate(`/post/${dbPost.$id}`)
                }    
            }
        }
    }

    //slug for link or id
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";

    }, [])

    //send value to slugTransform
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="p-2 w-full sm:w-1/4 md:w-1/2 lg:3/4">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="p-2 w-full sm:w-1/4 md:w-1/2 lg:3/4">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={dbService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500 hover:bg-green-700" : "bg-red-600 hover:bg-[#ee0404]"} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm