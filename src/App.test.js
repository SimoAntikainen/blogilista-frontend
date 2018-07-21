import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  const user = {
    username: 'tester',
    token: '1231231214',
    name: 'Teuvo Testaaja'
  }

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('before log on no blogs are rendered and login form is rendered', () => {
      app.update()
      
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
      expect(app.html()).toContain('login')
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      app = mount(<App />)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

    })

    it('all blogs are rendered when user logged on', () => {
      app.update()
      //console.log(app.html())

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)

    })
  })

})