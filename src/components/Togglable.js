import React from 'react'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    const buttonStyle= {marginTop: '10px'}

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility} style={buttonStyle}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility} style={buttonStyle}>cancel</button>
        </div>
      </div>
    )
  }
}

export default Togglable