import React, { Component } from 'react';
import './style.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Users: [],
      Border: { border: '2px solid black' },
      searchstring:"",
    };
  }

  componentDidMount() {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) =>
        this.setState(
          () => {
            return { Users: data };
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }

OnSearch=(event) =>  {
  const searchstring = event.target.value;

this.setState(
  () => { return {  searchstring }},
  () => { console.log(this.state,"42")}
 )
 }

 DeleteItem=(id) => {
   const newList = this.state.Users.splice(id,1);
   this.setState({filterdata:newList})

  //  alert("hello all" + id )
   console.log(id,"4343")
 }
  render() {
 
    const { Users,searchstring} = this.state;
    const OnSearch = this;

    const filterdata = this.state.Users.filter(item => { 
      return( item.category.includes(this.state.searchstring))
    });

    return (
      <div>
        <h4> searching Data in class component </h4>
        <p> <b> Description : </b>  search for the products based on category </p>
        <div>
          <label> Search : </label>
          <input type="search" placeholder="search for prodict"
           onChange={this.OnSearch}

          />
        </div>
        <div>
          {
            <table>
              <thead>
                <td style={this.state.Border}> S.No</td>
                <td style={this.state.Border}> Title </td>
                <td style={this.state.Border}> Description</td>
                <td style={this.state.Border}> Category </td>
                <td style={this.state.Border}> Price </td>
                <td style={this.state.Border}> count </td>
                <td style={this.state.Border}> Rating </td>
                <td style={this.state.Border}> Delete Item  </td>
              </thead>
              <tbody>
                {filterdata.map((item) => (
                  <tr>
                    <td style={this.state.Border}>{item.id} </td>
                    <td style={this.state.Border}>{item.title} </td>
                    <td style={this.state.Border}>{item.description} </td>
                    <td style={this.state.Border}>{item.category} </td>
                    <td style={this.state.Border}>$. {item.price} </td>
                    <td style={this.state.Border}>{item.rating.count} </td>
                    <td style={this.state.Border}>{item.rating.rate} </td>
                    <td style={this.state.Border}> <button 
                    onClick={() => this.DeleteItem(item)} >Delete </button>  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>
    );
  }
}
