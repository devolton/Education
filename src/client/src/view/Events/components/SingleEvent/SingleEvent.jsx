import Config from '../../../../config';
import {Link} from "react-router-dom";
import {DateConverter} from "../../../../tools/DateConverter";
import {useEffect, useState} from "react";

export default function SingleEvent({oneEvent,key=null}){
    const [formattedDate , setFormatterDate] = useState('19th April, 2023')
    useEffect(()=>{
        let date = new Date(oneEvent.eventVenue.startDate);
        setFormatterDate(DateConverter.formatDate(date));

    },[])



    return (  <div key={key} className="col-lg-6 pb-30">
        <div className="single-carusel row align-items-center">
            <div className="col-12 col-md-6 thumb">
                <img className="img-fluid" src={Config.SERVER.URL+oneEvent.thumbnailPath} alt='image'/>
            </div>
            <div className="detials col-12 col-md-6">
                <p>{formattedDate}</p>
                <Link to={`/events/${oneEvent.slug}`}><h4>{oneEvent ? oneEvent.title : 'Title'  }</h4></Link>
                <p>
                    {oneEvent ? oneEvent.shortDescription : 'decription'}
                </p>
            </div>
        </div>
    </div>);
}