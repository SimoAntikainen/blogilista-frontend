import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      notification: null,
      notificationType: null,
      title: '',
      author: '',
      url: ''
    }
  }

  async componentDidMount() {
    try {
      const blogs = await blogService.getAll()
      const sortedBlogs = this.sortedByLikes(blogs)
      this.setState({blogs: sortedBlogs})
    } catch(exception) {
      this.setState({
        notification: 'could not retrieve blogs',
        notificationType : 'error'
      })
      setTimeout(() => {
        this.setState({ notification: null,notificationType: null})
      }, 5000)
    }

    /**blogService.getAll().then(blogs => {
      const sortedBlogs = this.sortedByLikes(blogs)
      this.setState({blogs: sortedBlogs})
    })**/
    console.log("HERRRRRRRRRR", this.state.blogs.length)

    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      console.log("not here")
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    } 
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
  
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        notification: 'username or password is wrong',
        notificationType : 'error'
      })
      setTimeout(() => {
        this.setState({ notification: null,notificationType: null })
      }, 5000)
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    try {
      const blogCreated = await blogService.create(blogObject)
      console.log("blog created", blogCreated.user)
      this.setState({
        blogs: [blogCreated].concat(this.state.blogs),
        title: '',
        author: '',
        url: '',
        notification: `New blog ${blogCreated.title} by ${blogCreated.author} added`,
        notificationType : 'success'
      })
      setTimeout(() => {
        this.setState({ notification: null,notificationType: null})
      }, 5000)

    } catch(exception) {
      this.setState({
        notification: 'insufficient information',
        notificationType : 'error'
      })
      setTimeout(() => {
        this.setState({ notification: null,notificationType: null})
      }, 5000)
    }
  }

  addLikesTo = async (id) => {
    
      const blog = this.state.blogs.find(n => n.id === id)
      const likesPlus = blog.likes + 1
      const blogToChange = { ...blog, likes: likesPlus}

      try {
        const changedBlog = await blogService.update(id, blogToChange)
        const copiedBlogs = this.state.blogs.map(blog => blog.id !== id ? blog : changedBlog)
        const sortedBlogs = this.sortedByLikes(copiedBlogs)
        this.setState({
          blogs: sortedBlogs
        })
      } catch(exception) {
        this.setState({
          notification: 'exception in adding likes',
          notificationType : 'error'
        })
        setTimeout(() => {
          this.setState({ notification: null,notificationType: null})
        }, 5000)

      }

      
      /**blogService
        .update(id, changedBlog)
        .then(changedBlog => {
          const copiedBlogs = this.state.blogs.map(blog => blog.id !== id ? blog : changedBlog)
          const sortedBlogs = this.sortedByLikes(copiedBlogs)
          this.setState({
            blogs: sortedBlogs
          })
        })
        .catch(error => {
        })**/
  }

  removeBlog = async (id) => {

    if(window.confirm(`Do you want to remove ${this.state.blogs.find(n => n.id === id).title}`)) {
    
    const blog = this.state.blogs.find(n => n.id === id)
    const blogToRemove = { ...blog}

    try {
      await blogService.deleteBlog(id)
      this.setState({
        blogs : this.state.blogs.filter(blog => blog.id !== id),
        notification: `removed blog ${blogToRemove.title}`,
        notificationType : 'success'
      })
      setTimeout(() => {
        this.setState({ notification: null,notificationType: null})
      }, 5000)

    } catch(exception) {
      this.setState({
        notification: 'exception in the removal of blog',
        notificationType : 'error'
      })
      setTimeout(() => {
        this.setState({ notification: null,notificationType: null})
      }, 5000)

      }
    }
  }

  compareLikes = (a, b) => {
    return a.likes - b.likes
  }

  sortedByLikes = (blogs) => {
    const blogsToSort = [... blogs]
    return blogsToSort.sort(this.compareLikes)
  }

  logOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    this.setState({user : null})
  }
  
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    const loginForm = () => (
      <div className="login">
        <h2>Log in</h2>

        <form onSubmit={this.login} className="loginForm">
          <div>
            username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button>kirjaudu</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <Togglable buttonLabel="Add blog">
        <BlogForm
          handleSubmit={this.addBlog}
          handleChange={this.handleBlogFieldChange}
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
          addLikes={this.addLike}
        />
      </Togglable>
    )

    
    return (
      <div>
        <Notification message={this.state.notification} type={this.state.notificationType} />
        {this.state.user === null ?
          loginForm() :
        <div>
          <p>{this.state.user.name} logged in</p>
          <button onClick={this.logOut}>logout</button>
          {blogForm()}
        <div>
          <h2>blogs</h2>
            {this.state.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} username={this.state.user.username} 
            addLike={() => this.addLikesTo(blog.id)} removeBlog={()=> this.removeBlog(blog.id)} />
            )}
        </div>
        </div>
        }
      </div>
    )
  }
}

export default App;
