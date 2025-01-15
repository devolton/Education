import SingleEvent from "../../components/SingleEvent/SingleEvent";

export default function EventsContainer({eventsCollection,onClickHandler}) {

    return (<div className="row align-items-center">
        {eventsCollection.map(oneEvent => {
            return (<SingleEvent key={'single-event-'+oneEvent.id} oneEvent={oneEvent}/>);
        })}
        <button onClick={onClickHandler} className="text-uppercase primary-btn mx-auto mt-40">Load more</button>
    </div>)
}