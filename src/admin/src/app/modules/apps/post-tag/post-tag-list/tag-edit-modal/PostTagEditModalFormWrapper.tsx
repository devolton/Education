import {useQuery} from 'react-query'

import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useEffect, useState} from "react";
import {usePostTagListView} from "../core/PostTagListViewProvider.tsx";
import {getPostTagById} from "../core/_post.tag.request.ts";
import {initialPostTag, PostTag} from "../core/_post.tag.model.ts";
import {PostTagEditModalForm} from "./PostTagEditModalForm.tsx";

const PostTagEditModalFormWrapper = () => {
    const {itemIdForUpdate, setItemIdForUpdate} = usePostTagListView();
    const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
    const {
        isLoading,
        data: postTag,
        error,
    } = useQuery(
        `${QUERIES.ONE_OPTION}-${itemIdForUpdate}`,
        () => {
            return getPostTagById(itemIdForUpdate);

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
    useEffect(() => {

    }, [])

    if (!itemIdForUpdate) {
        let emptyPostTag: PostTag = {
            id: initialPostTag.id,
            name: initialPostTag.name,

        }
        return <PostTagEditModalForm isLoading={isLoading} postTag={emptyPostTag}/>
    }

    if (!isLoading && !error && postTag) {
        return <PostTagEditModalForm isLoading={isLoading} postTag={postTag}/>
    }

    return null
}

export {PostTagEditModalFormWrapper}
