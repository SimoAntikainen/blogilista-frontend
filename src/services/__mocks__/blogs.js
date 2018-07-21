let token = '1231231214'

const blogs = [
  {
    id: "5b44c9641711ca1cf09b4b7c",
    title: "aaa",
    author: "vvv",
    url: "https://waitbutwhy.com/",
    likes: 3,
    user: {
    _id: "5b3e565a5528c201d04aa0c9",
    username: "super user",
    name: "super user"
    }
    },
    {
    id: "5b44c9901711ca1cf09b4b7d",
    title: "dasdsa",
    author: "dasdsad",
    url: "dasdsads",
    likes: 1,
    user: {
    _id: "5b3e565a5528c201d04aa0c9",
    username: "super user",
    name: "super user"
    }
    },
    {
    id: "5b44d2571711ca1cf09b4b7e",
    title: "dsad dsds",
    author: "asdas ffgf",
    url: "https://what-if.xkcd.com/",
    likes: 3,
    user: {
    _id: "5b3e565a5528c201d04aa0c9",
    username: "super user",
    name: "super user"
    }
    },
    {
    id: "5b44d2d01711ca1cf09b4b80",
    title: "das df f",
    author: " sads sad d s",
    url: "https://blog.codinghorror.com/",
    likes: 5,
    user: {
    _id: "5b3e565a5528c201d04aa0c9",
    username: "super user",
    name: "super user"
    }
    },
    {
    id: "5b44d4e11711ca1cf09b4b81",
    title: "adssad",
    author: "adsasd",
    url: "333",
    likes: 8,
    user: {
    _id: "5b3cea2b10945133e0131b36",
    username: "user1",
    name: "aaa bbb"
    }
    },
    {
    id: "5b44d53d1711ca1cf09b4b82",
    title: "fefe",
    author: "gr rg gre ",
    url: "https://www.iltalehti.fi/",
    likes: 0,
    user: {
    _id: "5b3cea2b10945133e0131b36",
    username: "user1",
    name: "aaa bbb"
    }
    },
    {
    id: "5b44d5cd1711ca1cf09b4b83",
    title: "adsad",
    author: "dsad",
    url: "https://www.iltalehti.fi/",
    likes: 4,
    user: {
    _id: "5b3cea2b10945133e0131b36",
    username: "user1",
    name: "aaa bbb"
    }
    },
    {
    id: "5b44e0243bb7cf0fec75217b",
    title: "fsf",
    author: "fsafsa",
    url: "dsdsads",
    likes: 16,
    user: {
    _id: "5b3cedbc376b8403240cd6ef",
    username: "user2",
    name: "ccc ddd"
    }
    },
    {
    id: "5b4667f999d0ea3b14947f9b",
    title: "hieno blogi",
    author: "Mahtava blogaaja",
    url: "https://medium.com/front-end-hacking/async-await-with-react-lifecycle-methods-802e7760d802",
    likes: 2,
    user: {
    _id: "5b3cedbc376b8403240cd6ef",
    username: "user2",
    name: "ccc ddd"
    }
    },
    {
    id: "5b47c3611923631200c71d4e",
    title: "dsadsa",
    author: "dasdsad",
    url: "adssad",
    likes: 3,
    user: {
    _id: "5b3cedbc376b8403240cd6ef",
    username: "user2",
    name: "ccc ddd"
    }
    }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken }