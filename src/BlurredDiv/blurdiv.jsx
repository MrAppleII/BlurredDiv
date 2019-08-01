import React, { Component } from "react"
import styled from "styled-components"

class BlurDiv extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.ourChildDiv = React.createRef()
  }
  componentDidMount() {
    this.setPlaceholderText()
  }

  setPlaceholderText = () => {
      let elemHeight = this.getCurrentHeight()
      let elemWidth =  this.getCurrentWidth()
      this.setState({
          divHeight:elemHeight,
          divWidth:elemWidth
      })
  }

  getCurrentHeight = () => {
    if (this.ourChildDiv.current) {
      // console.log("width", this.yAxisEl.current.getBoundingClientRect())
      return this.ourChildDiv.current.getBoundingClientRect().height
    } else {
      return 0
    }
  }
  getCurrentWidth = () => {
    if (this.ourChildDiv.current) {
      // console.log("width", this.yAxisEl.current.getBoundingClientRect())
      return this.ourChildDiv.current.getBoundingClientRect().width
    } else {
      return 0
    }
  }

  render() {
    try {
      return (
        <LayoutWrapper>
          <PlaceholderLayout
            height={this.state.divHeight}
            width={this.state.divWidth}
          >
          <PlaceholderText>{this.props.placeholderText}</PlaceholderText>
          </PlaceholderLayout>

          <BlurWrapper ref={this.ourChildDiv}>
            {this.props.children}
          </BlurWrapper>
        </LayoutWrapper>
      )
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}
const BlurWrapper = styled.div`
  filter: blur(5px);
  
  pointer-events: none;
`
const PlaceholderText = styled.span`
  font-family: system, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Lucida Grande";
  margin: auto 0;
  color: black;
  font-weight:300;
  font-size:1em;
  position: relative;
  text-align:center;
  line-height:1em;
  width:100%;
`
const PlaceholderLayout = styled.div`
  display: flex;
  flex-direction: row;
  position:absolute;
  align-content: center;
  justify-content: center;
  width: ${props => (props.width ? props.width + "px" : "auto")};
  height: ${props => (props.height ? props.height + "px" : "auto")};
`
const LayoutWrapper = styled.div`
  position: relative;
 margin-left:auto;
 margin-right:auto;
`
export default BlurDiv
