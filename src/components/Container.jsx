import React from 'react';
import Form from './Form';
import List from './List';

export default class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null
    };
  }

  handleEditClick = (id) => this.setState({
    id
  });

  handleSubmit = () => this.setState({
    id: null
  });

  render() {
    const { id } = this.state;
    return id
      ? <Form id={id} onSubmit={this.handleSubmit} />
      : <List onEditClick={this.handleEditClick} />;
  }
}
