export default function ContactInfo(){
    return (
        <div className="col-lg-4 d-flex flex-column address-wrap">
            <div className="single-contact-address d-flex flex-row">
                <div className="icon">
                    <span className="lnr lnr-home"></span>
                </div>
                <div className="contact-details">
                    <h5>Binghamton, New York</h5>
                    <p>
                        4343 Hinkle Deegan Lake Road
                    </p>
                </div>
            </div>
            <div className="single-contact-address d-flex flex-row">
                <div className="icon">
                    <span className="lnr lnr-phone-handset"></span>
                </div>
                <div className="contact-details">
                    <h5>00 (958) 9865 562</h5>
                    <p>Mon to Fri 9am to 6 pm</p>
                </div>
            </div>
            <div className="single-contact-address d-flex flex-row">
                <div className="icon">
                    <span className="lnr lnr-envelope"></span>
                </div>
                <div className="contact-details">
                    <h5>support@colorlib.com</h5>
                    <p>Send us your query anytime!</p>
                </div>
            </div>
        </div>
    );
}