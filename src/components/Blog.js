import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    addLike : PropTypes.func.isRequired,
    removeBlog : PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
    //console.log("Here")
  }

  render() {
    //const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const toggleInfo = { display: this.state.visible ? '' : 'none' }

    const blogStyle = {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle} className="content">
        <div onClick={this.toggleVisibility} className="toggleHiddenButton">
          {this.props.blog.title} by {this.props.blog.author}
        </div>
        <div style={toggleInfo} className="contentHiddenAtStart">
          <div>
          <a href={this.props.blog.url}> {this.props.blog.url}</a>
          </div>
          <div>
            likes {this.props.blog.likes}
            <button onClick={this.props.addLike}>like</button>
          </div>
          <div>
            added by {this.props.blog.user.username}
          </div>
          <div>
            <button onClick={this.props.removeBlog}>delete</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog

/**import React from 'react'
const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

export default Blog**/