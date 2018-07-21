import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

window.localStorage = localStorageMock

/**const user = {
  username: 'ccc ddd',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyIiwiaWQiOiI1YjNjZWRiYzM3NmI4NDAzMjQwY2Q2ZWYiLCJpYXQiOjE1MzE0Mjk5Nzd9.v6BlkkGPzMcWc-YRLMbSfLWYkTD4j7jsNaFsNAwHe38',
  name: 'user2'
}

localStorageMock.setItem('loggedBlogAppUser', JSON.stringify(user))**/



