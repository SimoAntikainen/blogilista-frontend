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
      //localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      app = mount(<App />)

    })

    it('all notes are rendered', () => {
      app.update()

      //console.log("dsad",localStorage.getItem('loggedBlogAppUser'))

      //app.instance().forceUpdate()
      //app.update()
      console.log(app.html())

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)



    })
  })



  /**it('before log on no blogs are rendered and login form is rendered', () => {
    app.update() //Forces a re-render
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(0)

    expect(app.html()).toContain('login')
    
    //console.log(loginComponent.text())
    //expect(blogComponents.length).toEqual(blogService.blogs.length)
  })

  it('after log on the blogs are rendered', () => {
    app.update() //Forces a re-render

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }
    
    localStorage.setItem('loggedBlogUser', JSON.stringify(user))

    app.update()

    console.log(app.html())

    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(blogService.blogs.length)

    //expect(app.html()).toContain('login')
    
    //console.log(loginComponent.text())
    //expect(blogComponents.length).toEqual(blogService.blogs.length)
  })**/

})