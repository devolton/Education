import {useQuery} from 'react-query'

import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useAuthorViewList} from "../core/AuthorQueryListViewProvider.tsx";
import {getAuthorById} from "../core/_author.request.ts";
import {Author, initialAuthor} from "../core/_author.model.ts";
import {AuthorModalForm} from "./AuthorModalForm.tsx";

const AuthorModalFormWrapper = () => {
    const {itemIdForUpdate, setItemIdForUpdate} = useAuthorViewList();
    const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
    const {
        isLoading,
        data: author,
        error,
    } = useQuery(
        `${QUERIES.ONE_AUTHOR}-${itemIdForUpdate}`,
        () => {
            return getAuthorById(itemIdForUpdate);

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
        let emptyAuthor: Author = {
            ...initialAuthor
        }
        return <AuthorModalForm isLoading={isLoading} author={emptyAuthor}/>
    }

    if (!isLoading && !error && author) {
         return <AuthorModalForm isLoading={isLoading} author={author}/>
    }

    return null
}

export {AuthorModalFormWrapper}
