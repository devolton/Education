import Config from '../../../../config';
import {useState} from "react";
import {NewsletterService} from "../../../../service/newsletter.service";

export default function FooterNewsletterSubscribeBlock() {
    const [email, setEmail] = useState('');

    function onNewsletterButtonHandler() {
        NewsletterService.subscribe(email)
            .then((res) => {
                if (res.data) {
                    setEmail('');
                }
            }).catch(err => {
            console.log(err);
        })

    }

    return (<div className="col-lg-4  col-md-6 col-sm-6 ">
        <div className="single-footer-widget">
            <h4>Newsletter</h4>
            <p>Stay update with our latest</p>
            <div className="" id="mc_embed_signup">
                <form>
                    <div className="input-group">
                        <input type="text" className="form-control" name="email" placeholder="Enter Email Address"
                               onChange={(e) => {
                                   setEmail(e.target.value)
                               }}
                        value={`${email}`}/>
                        <div className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={onNewsletterButtonHandler}>
                                <span className="lnr lnr-arrow-right"></span>
                            </button>
                        </div>
                        <div className="info">

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}