import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.person && props.person.id || null,
      name: props.person && props.person.name || null
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.person !== newProps.person && newProps.person) {
      this.setState({
        id: newProps.person.id,
        name: newProps.person.name
      });
    }
  }

  updateStateValue(name, value) {
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  submitForm() {
    this.props.updatePerson(this.state.id, this.state.name);
    this.props.onSubmit();
  }

  handleChange = (e) => this.updateStateValue(e.target.name, e.target.value);
  handleSubmit = (e) => {
    e.preventDefault();
    this.submitForm();
  };

  render() {
    if (!this.props.person) return null;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}


const PersonQuery = gql`
  query GetPerson($id: ID!) {
    person(id: $id) {
      id
      name
    }
  }
`;

const withData = graphql(PersonQuery, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ data: { person }}) => ({ person })
});

const UpdatePersonMutation = gql`
  mutation UpdatePerson($id: ID!, $name: String!) {
    updatePerson(id: $id, name: $name) {
      id
      name
    }
  }
`;

const withUpdatePerson = graphql(UpdatePersonMutation, {
  props: ({ mutate }) => ({
    updatePerson: (id, name) =>
      mutate({
        variables: { id, name },
        refetchQueries: ['GetPeopleList']
      })
  })
});

export default compose(withData, withUpdatePerson)(Form);
