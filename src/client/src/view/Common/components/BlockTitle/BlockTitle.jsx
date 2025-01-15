export default function BlockTitle({title, description}){

    return(   <div className="row d-flex justify-content-center">
        <div className="menu-content pb-70 col-lg-8">
            <div className="title text-center">
                <h1 className="mb-10">{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    </div>)
}