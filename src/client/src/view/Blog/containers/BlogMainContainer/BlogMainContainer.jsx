import BlogPostsContainer from "../BlogPostsContainer/BlogPostsContainer";
import BlogSidebarContainer from "../BlogSidebarContainer/BlogSidebarContainer";
import {useEffect, useState} from "react";

export default function BlogMainContainer({postsCollection}) {

        return (
            <section className="post-content-area">
                <div className="container">
                    <div className="row">
                        <BlogPostsContainer postsCollection={postsCollection}/>
                        <BlogSidebarContainer/>
                    </div>
                </div>
            </section>
        )

}