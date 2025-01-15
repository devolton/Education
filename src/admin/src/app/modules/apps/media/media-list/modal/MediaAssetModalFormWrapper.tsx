import {useQuery} from 'react-query'

import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useMediaAssetListView} from "../core/MediaAssetListViewProvider.tsx";
import {getMediaAssetById} from "../core/_media.asset.request.ts";
import {MediaAssetForm} from "./MediaAssetModalForm.tsx";



const MediaAssetModalFormWrapper = () => {
    const {itemIdForUpdate, setItemIdForUpdate} = useMediaAssetListView();
    const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
    const {
        isLoading,
        data: mediaAsset,
        error,
    } = useQuery(
        `${QUERIES.ONE_MEDIA_ASSET}-${itemIdForUpdate}`,
        () => {
             return getMediaAssetById(itemIdForUpdate);


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


    if (!isLoading && !error && mediaAsset) {
        return <MediaAssetForm isLoading={isLoading} mediaAsset={mediaAsset}/>
    }

    return null
}

export {MediaAssetModalFormWrapper}
