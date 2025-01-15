import {useQuery} from 'react-query'

import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useEffect, useState} from "react";
import {usePostListView} from "../core/PostListViewProvider.tsx";
import {getPostById} from "../core/_post.request.ts";
import {initialBlogPost, initialBlogPostInfo} from "../core/_post.model.ts";
import {PostEditModalForm} from "./PostEditModalForm.tsx";


const PostEditModalFormWrapper = () => {
    const {itemIdForUpdate, setItemIdForUpdate} = usePostListView();
    const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
    const {
        isLoading,
        data: post,
        error,
    } = useQuery(
        `${QUERIES.ONE_POST}-${itemIdForUpdate}`,
        () => {
            return getPostById(itemIdForUpdate);

        },
        {
            cacheTime: 0,
            enabled: enabledQuery,
            onError: (err) => {
                setItemIdForUpdate(undefined)
                console.error(err)
            },
        }
    )

    if (!itemIdForUpdate) {
        let emptyPost={
            ...initialBlogPost
        }
        console.log(emptyPost);
         return <PostEditModalForm isLoading={isLoading} post={emptyPost}/>
    }

    if (!isLoading && !error && post) {
        return <PostEditModalForm isLoading={isLoading} post={post}/>
    }

    return null
}

export {PostEditModalFormWrapper}
