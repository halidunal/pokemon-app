import React, { Component } from 'react'
import image from "../assets/avatar.png";
import "../pages/about.css";
import lindkedin from "../assets/linkedin-brands.svg"
import github from "../assets/github-brands.svg"
import whatsapp from "../assets/whatsapp-brands.svg"

export default class About extends Component {
    render() {
        return (          
            <div className="about">
                <div className="bg-image">
                    <img src={image} alt=""  className="card-img" style={{width:150, borderRadius:100}}/>
                </div>
                <div>
                </div>
                <div className="flex">
                    <h2 className="text">Halid Ünal</h2>
                    <h4 className="text-min">Full Stack Software Developer</h4>
                    <h5 className="text">Ankara/TURKEY</h5>
                    <div className="images">
                    <div className="icons">
                            <a className="icon" href="https://github.com/halidunal/" target="_blank">
                                <img src={github} />
                            </a>
                        </div>  
                        <div className="icons">
                            <a className="icon" href="https://www.linkedin.com/in/halid%C3%BCnal/" target="_blank">
                                <img src={lindkedin} />
                            </a>
                        </div>
                        <div className="icons">
                        <a className="icon" href="https://wa.me/905532247608" target="_blank">
                                <img src={whatsapp} />
                        </a>
                        </div>                      
                    </div>

                    <a className="mail" href="https://mail.google.com/mail/u/1/#inbox?compose=GTvVlcSBmltWKTMnSSwLnVGXZhKprXPkjmhHsCnqkcddxWMrdcCmQCjwbpXMqNVfBwLGbBDFvkFtC" target="_blank">halidunal@gmail.com</a>
                    <div className="skills">
                        <p className="skill">C#</p>
                        <p className="skill">ASP.NET</p>
                        <p className="skill">Javascript</p>
                        <p className="skill">ReactJS</p>
                        <p className="skill">AngularJS</p>
                        <p className="skill">jQuery</p>
                        <p className="skill">ReactNative</p>
                        <p className="skill">NativeScript</p>
                        <p className="skill">CSS3</p>
                        <p className="skill">HTML5</p>
                        <p className="skill">SQL</p>
                    </div>
                </div>               
            </div>
        )
    }
}
