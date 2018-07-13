import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'


//<Blog blog={blog} 
//addLike={() => this.addLikesTo(blog.id)} removeBlog={()=> this.removeBlog(blog.id)} />

describe('<Blog />', () => {
  let blogContent

  const addLikeMockCallBack = jest.fn()
  const removeBlogMockCallBack = jest.fn()

  const blog = {
    author: 'Tim Urban',
    title: 'How to Pick a Career (That Actually Fits You)',
    likes: 10,
    user : {username: 'John'}
  }

  beforeEach(() => {

    blogContent = shallow(
      <Blog blog={blog} addLike={addLikeMockCallBack}
      removeBlog={removeBlogMockCallBack}/>
    )
  })

  it('at start only author and title is displayed', () => {
    const divContent = blogContent.find('.content')
    expect(divContent.text()).toContain(blog.author)
    expect(divContent.text()).toContain(blog.title)

    const divHidden = blogContent.find('.contentHiddenAtStart')
    //or .prop('style')
    expect(divHidden.getElement().props.style).toEqual({ display: 'none' })

  })

  it('after click all the information is displayed', () => {
    
    const button = blogContent.find('.toggleHiddenButton')
    button.simulate('click')

    const divShown = blogContent.find('.contentHiddenAtStart')
    expect(divShown.getElement().props.style).toEqual({ display: '' })
  })




})