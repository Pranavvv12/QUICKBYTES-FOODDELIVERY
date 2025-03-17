import React, { useState } from "react";
import './AppDownload.css';
import playstore from './playstore.webp';
import appstore from './appstore.webp';
import mobile from './mobile.png';

const Appd = () => {
    const [selecteds, setSelecteds] = useState('phone');
    const [countrycode, setCountrycode] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleOptionChange = (option) => {
        setSelecteds(option);
    }

    return (
        <div id="app-download">
            <div className="all">
                <div className="side1">
                    <img src={mobile} alt="Mobile Img" />
                </div>
                <div className="side2">
                    <h1>Get the Quickbytes App</h1>
                    <p>We will send you a link, open it on your phone to download the app</p>
                    <div className="alllabels">
                    <label>
                        <input
                            type="radio"
                            value="email"
                            checked={selecteds === 'email'}
                            onChange={() => handleOptionChange('email')}
                        />
                        Email
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="phone"
                            checked={selecteds === 'phone'}
                            onChange={() => handleOptionChange('phone')}
                        />
                        Phone
                    </label>

                    {selecteds === "email" ? (
                        <input className ="email-input-container" type="email" placeholder="Enter your email address" />
                    ) : (
                        <div className="phone-input-container">
                            <select
                                value={countrycode}
                                onChange={(e) => setCountrycode(e.target.value)}
                            >
                                <option value="+91">+91</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                                <option value="+61">+61</option>
                            </select>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    )}
                    </div>
                    
                    <button type="button">Share App Link</button>
                    <p className="downloadimgs">Download app from</p>
                    <div className="DownloadImages">
                        <img src={playstore} alt="Play Store" />
                        <img src={appstore} alt="App Store" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appd;
