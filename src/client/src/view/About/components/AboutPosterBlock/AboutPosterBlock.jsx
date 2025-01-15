import Config from "../../../../config";

export default function AboutPosterBlock({posterObj}){

    return (  <div className="col-lg-6 no-padding info-area-left">
        <img className="img-fluid" src={Config.SERVER.URL+posterObj.path} alt={posterObj.alt} title={posterObj.alt}/>
    </div>)
}