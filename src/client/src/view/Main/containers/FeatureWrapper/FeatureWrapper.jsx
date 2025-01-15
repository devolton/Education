import FeatureItem from "../../components/FeatureItem/FeatureItem";
import {useEffect, useState} from "react";
import FeatureContainer from "../FeatureContainer/FeatureContainer";

export default function FeatureWrapper() {
    const [featureCollection, setFeatureCollection] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setFeatureCollection([
            {
                id: 1,
                title: 'Learn online courses!',
                description: 'Learn online courses with best mentors in the world!',
                href: '/courses',
                linkTitle: 'Choose course'
            },
            {
                id: 2,
                title: 'Visit our events!',
                description: 'Meet real mentors from different companies',
                href: '/events',
                linkTitle: 'Lets go'

            },
            {
                id: 3,
                title: 'Read our blog!',
                description: 'Read the most actuality news in our blog',
                href: '/blog',
                linkTitle: 'Read blog'
            }]);
        setIsLoaded(true);

    }, []);

    if (!isLoaded) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <section className="feature-area">
                <FeatureContainer featuresCollection={featureCollection}/>
            </section>
        );
    }
}