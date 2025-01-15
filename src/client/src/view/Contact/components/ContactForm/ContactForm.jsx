import {useEffect, useState} from "react";
import {MessageService} from "../../../../service/message.service";

export default function ContactForm(){
    const [name, setName] = useState('')
    const [email,setEmail] = useState('');
    const [message, setMessage] = useState('');
    function sendMessageHandler(){
        let userMessage={
            name:name,
            email:email,
            message:message
        }
        MessageService.postMessage(userMessage)
            .then((res)=>{
                if(res.status===201){

                    setName('')
                    setEmail('');
                    setMessage('');
                }
                else{
                    console.log("Message Creation Error");
                }
            }).catch(err=>{
                console.log(err);
        })

    }


    return (
        <div className="col-lg-8">
            <form className="form-area contact-form text-right" id="myForm" >
                <div className="row">
                    <div className="col-lg-6 form-group">
                        <input name="name" placeholder="'Enter your name'"
                               className="common-input mb-20 form-control"
                               required=""
                               type="text"
                               value={name}
                               onChange={(e)=>{setName(e.target.value)}}
                        />

                        <input name="email" placeholder="Enter email address"

                               className="common-input mb-20 form-control" required=""
                               type="email"
                               value={email}
                               onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                                    <textarea className="common-textarea form-control"
                                              name="message"
                                              placeholder="Enter Messege"
                                              value={message}
                                               onChange={(e)=>{setMessage(e.target.value)}}></textarea>
                    </div>
                    <div className="col-lg-12">
                        <div className="alert-msg"></div>
                        <button type='button' onClick={sendMessageHandler} className="genric-btn primary">Send Message</button>
                    </div>
                </div>
            </form>
        </div>
    )
}