import {useQuery} from 'react-query'

import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useEffect, useState} from "react";

import {usePostCategoryListView} from "../core/PostCategoryListViewProvider.tsx";
import {initialPostCategory, PostCategory} from "../core/_post.category.model.ts";
import {getCategoryById} from "../core/_category.request.ts";
import {PostCategoryEditModalForm} from "./PostCategoryEditModalForm.tsx";

const PostCategoryEditModalFormWrapper = () => {
    const {itemIdForUpdate, setItemIdForUpdate} = usePostCategoryListView();
    const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
    const {
        isLoading,
        data: postCategory,
        error,
    } = useQuery(
        `${QUERIES.ONE_CATEGORY}-${itemIdForUpdate}`,
        () => {
            return getCategoryById(itemIdForUpdate);

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
        let emptyCategory:PostCategory ={
            id:initialPostCategory.id,
            name:initialPostCategory.name,
            description:initialPostCategory.description,
            thumbnailPath:initialPostCategory.thumbnailPath
        }
        return <PostCategoryEditModalForm isLoading={isLoading} postCategory={emptyCategory}/>
    }

    if (!isLoading && !error && postCategory) {
        return <PostCategoryEditModalForm isLoading={isLoading} postCategory={postCategory}/>
    }

    return null
}

export {PostCategoryEditModalFormWrapper}
