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

  componentDidMount() {
    blogService.getAll().then(blogs => {
      const sortedBlogs = this.sortedByLikes(blogs)
      this.setState({blogs: sortedBlogs})
    })

    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
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
        notification: 'käyttäjätunnus tai salasana virheellinen',
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
        blogs: this.state.blogs.concat(blogCreated),
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
        notification: 'puutteelliset tiedot',
        notificationType : 'error'
      })
      setTimeout(() => {
        this.setState({ notification: null,notificationType: null})
      }, 5000)
    }
  }

  addLikesTo = (id) => {
    return () => {
      const blog = this.state.blogs.find(n => n.id === id)
      const likesPlus = blog.likes + 1
      const changedBlog = { ...blog, likes: likesPlus}

      blogService
        .update(id, changedBlog)
        .then(changedBlog => {
          const copiedBlogs = this.state.blogs.map(blog => blog.id !== id ? blog : changedBlog)
          const sortedBlogs = this.sortedByLikes(copiedBlogs)
          this.setState({
            blogs: sortedBlogs
          })
        })
        .catch(error => {
        })
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
      <div>
        <h2>Log in</h2>

        <form onSubmit={this.login}>
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
            <Blog key={blog.id} blog={blog} addLike={this.addLikesTo(blog.id)} />
            )}
        </div>
        </div>
        }
      </div>
    )
  }
}

export default App;
