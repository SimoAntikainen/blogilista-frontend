import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
    console.log("Here")
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
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility}>
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div style={toggleInfo}>
          <div>
          <a href={this.props.blog.url}> {this.props.blog.url}</a>
          </div>
          <div>
            likes {this.props.blog.likes}
            <button>like</button>
          </div>
          <div>
            added by {this.props.blog.user.username}
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