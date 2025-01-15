import Config from '../../../../../config'
import './CategoryWidget.css'
import {PostFetchService} from "../../../../../tools/PostFetchService";
import {useRef} from "react";
import {BlogTopCategoryBackgroundChanger} from "../../../../../tools/BlogTopCategoryBackgroundChanger";


export default function CategoryWidget({oneCategory}) {
    const overlayBlockRef = useRef()

    function onCategoryClickHandler() {

        BlogTopCategoryBackgroundChanger.setActiveBackground(overlayBlockRef);
        PostFetchService.category = oneCategory.name.replaceAll(' ', '%20');
        PostFetchService.refresh();

    }

    return (
        <div className="col-lg-4">
            <div className="single-cat-widget">
                <div className="content relative">
                    <div ref={overlayBlockRef} className="overlay overlay-bg"></div>
                    <a type={'button'} onClick={onCategoryClickHandler} className='cursor-pointer'>
                        <div className="thumb">
                            <img className="content-image img-fluid d-block mx-auto"
                                 style={{ width: '370px', height: '230px', objectFit: 'cover' }}
                                 src={Config.SERVER.URL + oneCategory.thumbnailPath} alt={oneCategory.name}
                            />
                        </div>
                        <div className="content-details text-center">
                            <h4 className="content-title mx-auto text-uppercase">{oneCategory.name}</h4>
                            <span></span>
                            <p className='category-widget-description'>{oneCategory.description}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}