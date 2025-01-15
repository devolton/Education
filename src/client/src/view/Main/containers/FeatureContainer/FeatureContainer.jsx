import FeatureItem from "../../components/FeatureItem/FeatureItem";

export default function FeatureContainer({featuresCollection}) {

    return (<div className="container">
        <div className="row">
            {
                featuresCollection.map((oneFeature) => {
                    return (<FeatureItem key={'feature-'+oneFeature.id} oneFeature={oneFeature}/>);
                })
            }

        </div>
    </div>)
}