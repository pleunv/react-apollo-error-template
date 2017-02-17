import React from 'react';
import Form from './Form';
import List from './List';

const DisplayMode = {
  List: 0,
  Form: 1
};

export default class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMode: DisplayMode.List,
      id: null
    };
  }

  handleCreateClick = () => this.setState({
    displayMode: DisplayMode.Form,
    id: null
  });

  handleEditClick = (id) => this.setState({
    displayMode: DisplayMode.Form,
    id
  });

  handleSubmit = () => this.setState({
    displayMode: DisplayMode.List,
    id: null
  });

  render() {
    const { id, displayMode } = this.state;
    let component;

    if (displayMode === DisplayMode.List) {
      component = <List onEditClick={this.handleEditClick} onCreateClick={this.handleCreateClick} />;
    } else if (displayMode === DisplayMode.Form) {
      component = <Form id={id} onSubmit={this.handleSubmit} />
    }

    return component;
  }
}
