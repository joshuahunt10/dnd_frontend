import React, { Component } from 'react';

class Dashboard extends Component {
  static isPrivate = true

//Here do I do a componentDidMount and send the token to the api which then decodes it and find the email then searches the DB for that user and uses include for tables and characters and sends that back as a json to display here?

  render() {
    //write an if statement that checks to see if the state has a token in it or redirects to login page.  The token will come in as props and immediately set it to state under componentWillMount?
    console.log('this.props',this.props);
    return (
      <div>
        <h2>This is the user Dashboard</h2>
        <p>{this.props.token}</p>
      </div>
    );
  }

}

export default Dashboard;
