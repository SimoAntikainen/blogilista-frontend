import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      author: 'Tim Urban',
      title: 'How to Pick a Career (That Actually Fits You)',
      likes: 10
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.likes)
  })

  it('when like is pressed twice the event handler tied to it is called twice', () => {

    const blog = {
      author: 'Tim Urban',
      title: 'How to Pick a Career (That Actually Fits You)',
      likes: 10
    }

    const mockHandler = jest.fn()
    
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)


  })

})