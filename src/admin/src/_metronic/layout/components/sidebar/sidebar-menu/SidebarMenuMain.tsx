import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
    const intl = useIntl()

    return (
        <>
            <SidebarMenuItem
                to='/dashboard'
                icon='element-11'
                title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
                fontIcon='bi-app-indicator'
            />
            <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' fontIcon='bi-layers'/>
            {/*<div className='menu-item'>*/}
            {/*    <div className='menu-content pt-8 pb-2'>*/}
            {/*        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<SidebarMenuItemWithSub*/}
            {/*    to='/crafted/pages'*/}
            {/*    title='Pages'*/}
            {/*    fontIcon='bi-archive'*/}
            {/*    icon='element-plus'*/}
            {/*>*/}
            {/*    <SidebarMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>*/}
            {/*        <SidebarMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true}/>*/}
            {/*        <SidebarMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true}/>*/}
            {/*        <SidebarMenuItem*/}
            {/*            to='/crafted/pages/profile/campaigns'*/}
            {/*            title='Campaigns'*/}
            {/*            hasBullet={true}*/}
            {/*        />*/}
            {/*        <SidebarMenuItem*/}
            {/*            to='/crafted/pages/profile/documents'*/}
            {/*            title='Documents'*/}
            {/*            hasBullet={true}*/}
            {/*        />*/}
            {/*        <SidebarMenuItem*/}
            {/*            to='/crafted/pages/profile/connections'*/}
            {/*            title='Connections'*/}
            {/*            hasBullet={true}*/}
            {/*        />*/}
            {/*    </SidebarMenuItemWithSub>*/}

            {/*    <SidebarMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>*/}
            {/*        <SidebarMenuItem*/}
            {/*            to='/crafted/pages/wizards/horizontal'*/}
            {/*            title='Horizontal'*/}
            {/*            hasBullet={true}*/}
            {/*        />*/}
            {/*        <SidebarMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true}/>*/}
            {/*    </SidebarMenuItemWithSub>*/}
            {/*</SidebarMenuItemWithSub>*/}
            {/*<SidebarMenuItemWithSub*/}
            {/*    to='/crafted/accounts'*/}
            {/*    title='Accounts'*/}
            {/*    icon='profile-circle'*/}
            {/*    fontIcon='bi-person'*/}
            {/*>*/}
            {/*    <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true}/>*/}
            {/*    <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true}/>*/}
            {/*</SidebarMenuItemWithSub>*/}
            {/*<SidebarMenuItemWithSub to='/error' title='Errors' fontIcon='bi-sticky' icon='cross-circle'>*/}
            {/*    <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true}/>*/}
            {/*    <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true}/>*/}
            {/*</SidebarMenuItemWithSub>*/}
            {/*<SidebarMenuItemWithSub*/}
            {/*    to='/crafted/widgets'*/}
            {/*    title='Widgets'*/}
            {/*    icon='element-7'*/}
            {/*    fontIcon='bi-layers'*/}
            {/*>*/}
            {/*    <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true}/>*/}
            {/*    <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true}/>*/}
            {/*    <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true}/>*/}
            {/*    <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true}/>*/}
            {/*    <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true}/>*/}
            {/*    <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true}/>*/}
            {/*</SidebarMenuItemWithSub>*/}
            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Education</span>
                </div>
            </div>
            <SidebarMenuItemWithSub
                to='/apps/chat'
                title='Chat'
                fontIcon='bi-chat-left'
                icon='message-text-2'
            >
                <SidebarMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true}/>
                {/*<SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true}/>*/}
                {/*<SidebarMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true}/>*/}
            </SidebarMenuItemWithSub>
            <SidebarMenuItemWithSub
                to='/apps/control'
                title='Control'
                icon='element-8'
                fontIcon='bi-layers'>
                <SidebarMenuItem
                    to='/apps/option-management/options'
                    icon='tablet'
                    title='Options'
                    fontIcon='bi-layers'
                />
                <SidebarMenuItem
                    to='/apps/navigation-management/navigations'
                    icon='element-5'
                    title='Navigations'
                    fontIcon='bi-layers'
                />
                <SidebarMenuItem
                    to='/apps/media-management/images'
                    icon='element-5'
                    title='Media'
                    fontIcon='bi-layers'
                />
            </SidebarMenuItemWithSub>
            <SidebarMenuItemWithSub
                to={'/apps/events'}
                title={'Event'}
                icon={'element-9'}
                font-icon={'bi-layers'}>
                <SidebarMenuItem to={'/apps/event-management/events'}
                                 title={'Events'}
                                 icon={'element-11'}
                                 fontIcon={'bi-layers'}/>
            </SidebarMenuItemWithSub>
            <SidebarMenuItemWithSub
                to={'/apps/courses'}
                title={'Course'}
                icon={'element-12'}
                font-icon={'bi-layers'}
                >
                <SidebarMenuItem to={'/apps/review-management/reviews'}
                                 title={'Reviews'}
                                 icon={'element-4'}
                                 fontIcon={'bi-layers'}/>
                <SidebarMenuItem to={'/apps/course-management/courses'}
                                 title={'Course'}
                                 icon={'element-5'}
                                 font-icon={'bi-layers'}/>
            </SidebarMenuItemWithSub>
            <SidebarMenuItemWithSub
                to='/apps/users'
                title='User'
                icon='element-9'
                font-icon='bi-layers'>
                <SidebarMenuItem
                    to='/apps/user-management/users'
                    icon='abstract-28'
                    title='Users'
                    fontIcon='bi-layers'
                />
                <SidebarMenuItem to={'/apps/role-management/roles'}
                                 title={'Role'}
                                 font-icon='bi-layers'
                                 icon={'abstract-21'}
                />
                <SidebarMenuItem to={'/apps/message-management/messages'}
                                 title={'Message'}
                                 font-icon='bi-layers'
                                 icon='abstract-23'/>
            </SidebarMenuItemWithSub>
            <SidebarMenuItemWithSub
                to='/apps/blog'
                title='Blog'
                icon='element-8'
                font-icon='bi-layers'
            >
                <SidebarMenuItem
                    to={'/apps/tags-management/tags'}
                    title={'Post tags'}
                    font-icon='bi-layers'
                    icon='abstract-20'/>
                <SidebarMenuItem
                    to={'/apps/category-management/categories'}
                    title={'Category'}
                    font-icon='bi-layers'
                    icon='abstract-18'/>
                <SidebarMenuItem
                    to={'/apps/posts-management/posts'}
                    title='Posts'
                    font-icon='bi-layers'
                    icon='abstract-27'/>
                <SidebarMenuItem
                    to={'/apps/author-management/authors'}
                    title='Author'
                    font-icon='bi-layers'
                    icon='abstract-27'/>

            </SidebarMenuItemWithSub>

            <div className='menu-item'>
                <a
                    target='_blank'
                    className='menu-link'
                    href={import.meta.env.VITE_APP_PREVIEW_DOCS_URL + '/changelog'}
                >
          <span className='menu-icon'>
            <KTIcon iconName='code' className='fs-2'/>
          </span>
                    <span className='menu-title'>Changelog {import.meta.env.VITE_APP_VERSION}</span>
                </a>
            </div>
        </>
    )
}

export {SidebarMenuMain}
