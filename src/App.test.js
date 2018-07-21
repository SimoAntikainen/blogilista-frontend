import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'


describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('before log on no blogs are rendered and login form is rendered', () => {
    app.update() //Forces a re-render
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(0)

    expect(app.html()).toContain('login')
    
    //console.log(loginComponent.text())
    //expect(blogComponents.length).toEqual(blogService.blogs.length)
  })
})