import React, { Component } from 'react';

class LinkCreate extends Component {
  handleSubmit(event) {
    event.preventDefault();
    // By default, Meteor ships with the 'insecure package', meaning anyone can manipulate data
      // To prevent this, we '> meteor remove insecure'
      // Meteor methods are functions that give us secure ways to add/remove/change our data
      // This method is defined inside imports/collections/links.js and this is how we call it
    Meteor.call('links.insert', this.refs.input.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label>Link to shorten</label>
          <input ref="input" className="form-control" />
        </div>
        <button className="btn btn-primary">Shorten!</button>
      </form>
    );
  }
}

export default LinkCreate;