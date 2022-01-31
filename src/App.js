import React, { Fragment } from "react";
import ReactPaginate from 'react-paginate';
import './App.css';

class App extends React.Component {
  state = {
    isLoading: true,
    users: [],
    error: null,
    perPage: 2,
    page: 0,
    pages: 0,
  };
  getFetchUsers() {
    this.setState({ loading: true }, () => {
      fetch("http://localhost:3000/posts")
        .then((res) => res.json())
        .then((result) =>
          this.setState({
            loading: false,
            users: result,
            pages: Math.floor(result.length / this.state.perPage),
          })
        )
        .catch(console.log);
    });
  }

  handlePageClick = (event) => {
    let page = event.selected;
    this.setState({ page });
  };

  componentDidMount() {
    this.getFetchUsers();
  }
  render() {
    const { users, error, page, perPage, pages } = this.state;
    let items = users.slice(page * perPage, (page + 1) * perPage);
    const posts =
      items.map((user) => {
        const { adderss, name, email } = user;
        return (
          <tr key={name}>
            <td>Name: {name}</td>
            <td>Email: {email}</td>
            <td>Address: {adderss}</td>
          </tr>
        );
      }) || "";

    return (
      <Fragment>
        <h1>All User</h1>
        {error ? <p>{error.message} </p> : null}{" "}
        
        <table className='Table'>
         <thead>
         <tr>
           <th>Name</th>
           <th>Email</th>
           <th>Address</th>
         </tr>
         </thead>
         <tbody>
         {posts}
         </tbody>
       </table>
       <ReactPaginate
         previousLabel={'prev'}
         nextLabel={'next'}
         pageCount={pages}
         onPageChange={this.handlePageClick}
         containerClassName={'pagination'}
         activeClassName={'active'}
       />

        {/* {users.map((user) => {
          const { adderss, name, email } = user;
          return (
            <div key={name}>
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              <p>Address: {adderss}</p>
              <hr />
            </div>
          );
        } */
        }
        
      </Fragment>
    );
  }
}

export default App;
