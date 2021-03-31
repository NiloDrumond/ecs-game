import React from "react";
//import ROUTES from "@Constants/routes";
import { Link } from "react-router-dom";

class Welcome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="section">
          <div className="container">
            <section className="hero is-info">
              <div className="hero-body">
                <p className="title">
                  Thank you for trying out the secure-electron-template!
                </p>
                <p className="subtitle">
                  Please navigate to view the features of this template.
                </p>
              </div>
            </section>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title is-2">Samples</h2>
            <div>Test</div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Welcome;