import React, { PropTypes } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class List extends React.Component {
  componentWillUnmount() {
    console.log('Unmounting <List />');
  }

  renderPerson({ id, name }) {
    return (
      <li key={id}>
        {name}
        <button onClick={() => this.props.onEditClick(id)}>edit</button>
      </li>
    );
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.items.map((item) => this.renderPerson(item))}
        </ul>
        <button onClick={this.props.onCreateClick}>create</button>
      </div>
    );
  }
}

List.PropTypes = {
  items: PropTypes.array,
  onEditClick: PropTypes.func.isRequired
};

List.defaultProps = {
  items: []
};

const PeopleListQuery = gql`
  query GetPeopleList {
    people {
      id
      name
    }
  }
`;

export default graphql(PeopleListQuery, {
  props: ({ data: { people }}) => ({
    items: people
  })
})(List);
