import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('SimpleBlog />', () => {
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
})