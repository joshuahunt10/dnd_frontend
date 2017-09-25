import React, {Component} from 'react';

class Splash extends Component {

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid" id="splash-page-container">
          <div className="container" id="splash-container">
            <h1 className="display-3" id="splash-text">Tabletop Storehouse</h1>
            <p className="lead" id="splash-text">Where Game Masters and Players can store living character sheets for their game.</p>
          </div>
        </div>
      </div>
    );
  }

}

export default Splash;
