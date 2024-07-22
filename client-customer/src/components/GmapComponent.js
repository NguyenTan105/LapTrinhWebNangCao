import React, { Component } from "react";
class Gmap extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-center">MY LOCATION</h2>
        <div
          className="d-flex justify-content-center"
          style={{ marginBottom: "40px" }}
        >
          <iframe
            title="gmap"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.5773274251344!2d106.78973766090687!3d10.864062296572328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752766e6e6297d%3A0xe2c27e64f150affb!2zNTMgxJDGsOG7nW5nIHPhu5EgMTgsIFBoxrDhu51uZyBMaW5oIFRydW5nLCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1721106081742!5m2!1sen!2s"
            width="800"
            height="600"
            style={{ border: 0 }}
            loading=" lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    );
  }
}
export default Gmap;
