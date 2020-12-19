import React, { Component } from 'react'
import axios from "axios";

const Button = ({ name, type, className, handleClick }) => <button type={type} className={className} onClick={handleClick} >{name}</button>

const GiphyForm = ({ value, handleChange, handleSubmit }) => {
  return (
    <form className="giphy-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" onChange={handleChange} value={value} name="search" placeholder="Enter a search term" />
      </div>
      <div className="form-group">
        <Button className="search-btn" name={"Search Giphy!"} type={"submit"}  />
      </div>
    </form>
  )
}

const Gif = ({ src, title }) => <img src={src} alt={title} />

export class Giphy extends Component {
  state = {
    search: "",
    gifs: [],
    gif: {}
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit = e => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const url = `https://api.giphy.com/v1/gifs/search?q=${this.state.search}&rating=g&api_key=mHCAmyz533BYvfPpDD0S64EfEbYYghb5`
        const res = await axios(url);
        const { data } = res.data;
        this.setState({
            gifs: [...this.state.gifs, data[(Math.floor(Math.random() * data.length) + 1)]],
            search: ""
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
  handleClick = (e) => {
    this.setState({
      gifs: []
    })
  }

  componentDidMount() {
      const fetchData = async () => {
      try {
        const url = `https://api.giphy.com/v1/gifs/search?q=funny&rating=g&api_key=mHCAmyz533BYvfPpDD0S64EfEbYYghb5`
        const res = await axios(url);
        const { data } = res.data;
        this.setState({
            gif: data[(Math.floor(Math.random() * data.length) + 1)]
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }
  
  render() {
    const { search, gifs, gif } = this.state;
    return (
      <div className="giphy-container">
        <h1 className="header white">Giphy Party</h1>
        <div className="giphy-header">
          <GiphyForm value={search} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
          <Button className="remove" name={"Remove Images"} type={"button"} handleClick={this.handleClick}  />
        </div>
        <div className="gif">
          <h4>Gif of the day</h4>
          <img src={ gif.images ? gif.images.original.url : ""} alt=""/>
        </div>
        <div className="gifs">
          {
            gifs.map(({id, title, images}) => <Gif key={id} src={images.original.url} title={title}  />)
          }
        </div>
      </div>
    )
  }
}

export default Giphy
