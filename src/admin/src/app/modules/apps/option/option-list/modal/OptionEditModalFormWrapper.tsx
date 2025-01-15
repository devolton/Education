import {useQuery} from 'react-query'

import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useEffect, useState} from "react";
import {useListView} from "../core/OptionListViewProvider.tsx";
import {getOptionById} from "../core/_option.request.ts";
import {initialOption, Option} from "../core/_option.model.ts";
import {OptionEditModalForm} from "./OptionEditModalForm.tsx";

const OptionEditModalFormWrapper = () => {
    const {itemIdForUpdate, setItemIdForUpdate} = useListView();
    const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
    const {
        isLoading,
        data: option,
        error,
    } = useQuery(
        `${QUERIES.ONE_OPTION}-${itemIdForUpdate}`,
        () => {
            return getOptionById(itemIdForUpdate);

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
        let emptyOption: Option = {
            id: initialOption.id,
            name: initialOption.name,
            value: initialOption.value

        }
        return <OptionEditModalForm isLoading={isLoading} option={emptyOption}/>
    }

    if (!isLoading && !error && option) {
        return <OptionEditModalForm isLoading={isLoading} option={option}/>
    }

    return null
}

export {OptionEditModalFormWrapper}
