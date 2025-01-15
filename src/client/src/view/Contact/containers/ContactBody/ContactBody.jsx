import ContactInfo from "../../components/ContactInfo/ContactInfo";
import ContactForm from "../../components/ContactForm/ContactForm";

export default function ContactBody(){

    return (
        <section className="contact-page-area section-gap">
            <div className="container">
                <div className="row">
                   <ContactInfo/>
                   <ContactForm/>
                </div>
            </div>
        </section>
    )
}