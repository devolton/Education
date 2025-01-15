import {Author} from "../../core/_author.model.ts";
import {Column} from "react-table";
import {SelectionHeader} from "../../../../common/components/table/columns/SelectionHeader.tsx";
import {SelectionCell} from "../../../../common/components/table/columns/SelectionCell.tsx";
import {useAuthorViewList} from "../../core/AuthorQueryListViewProvider.tsx";
import {useCourseRequest} from "../../../../course/course-list/core/CourseQueryRequestProvider.tsx";
import {DefaultHeader} from "../../../../common/components/table/columns/DefaultHeader.tsx";
import {useAuthorResponse} from "../../core/AuthorQueryResponseProvider.tsx";
import {useAuthorsRequest} from "../../core/AuthorQueryRequestProvider.tsx";
import {ImageInfoCell} from "../../../../common/components/table/columns/ImageInfoCell.tsx";
import {QUERIES, SocialLinkMappable} from "../../../../../../../_metronic/helpers";
import {ActionsCell} from "../../../../common/components/table/columns/ActionsCell.tsx";
import {removeAuthorById} from "../../core/_author.request.ts";
import {SocialLinksCell} from "../../../../common/components/table/columns/SocialLinksCell.tsx";
import {useEffect, useState} from "react";
const ignorableFields=["actions","selection",'social-link']
const authorColumns:ReadonlyArray<Column<Author>> =[
    {
        Header: (props) => {
            const {isAllSelected, onSelectAll} = useAuthorViewList()
            return (<SelectionHeader tableProps={props} isAllSelected={isAllSelected} onSelectAll={onSelectAll}/>)
        },
        id: 'selection',
        Cell:({...props})=>
        {
            const {selected,onSelect}= useAuthorViewList()
            return (<SelectionCell id={props.data[props.row.index].id} selected={selected} onSelect={onSelect}/>)

        }
    },
    {

        Header:(props)=>{
            const {state,updateState} = useCourseRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Informaion'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        id:'fullName',
        Cell:({...props})=>{

            return <ImageInfoCell upperSpanValue={props.data[props.row.index].fullName}
                                  downSpanValue={props.data[props.row.index].position}
                                  imagePath={props.data[props.row.index].posterpath}/>
        }
    },
    {
        Header:(props)=>{
            const {state,updateState} = useAuthorsRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Slogan'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        accessor:'slogan'
    },
    {
        Header:(props)=>{
            const {state,updateState} = useAuthorsRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Social media'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px text-center'
            />)
        },
        id:'social-link',
        Cell:({...props})=>{
            const [socialLinksMappableCollection,setSocialLinksMappableCollection] =useState<Array<SocialLinkMappable>>([])
            useEffect(()=>{
                let instagramObj:SocialLinkMappable={
                    href:props.data[props.row.index].instagramHref,
                    name:'instagram',
                    backColor:'danger'
                };
                let twitterObj:SocialLinkMappable={
                    name:'twitter',
                    href:props.data[props.row.index].twitterHref,
                    backColor:'primary-emphasis'
                }
                let facebookObj:SocialLinkMappable={
                    name:'facebook',
                    href:props.data[props.row.index].facebookHref,
                    backColor:'primary'
                }
                setSocialLinksMappableCollection([instagramObj,twitterObj,facebookObj]);


            },[])

            return <SocialLinksCell socialLinkCollection={socialLinksMappableCollection}/>
        }

    },
    {
        Header:(props)=>{
            const {state,updateState} = useAuthorsRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Actions'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px text-center'
            />)
        },
        id:'actions',
        Cell:({...props})=>{
            const {setItemIdForUpdate} = useAuthorViewList();
            const{query} = useAuthorResponse();
            const queryKey =`${QUERIES.AUTHORS_LIST+'-'+query}`
            return (<ActionsCell id={props.data[props.row.index].id}
                                 query={query}
                                 setItemIdForUpdate={setItemIdForUpdate}
                                 removeEntity={removeAuthorById}
                                 queryKey={queryKey}/>)
        }
    }
    ]

export {authorColumns}