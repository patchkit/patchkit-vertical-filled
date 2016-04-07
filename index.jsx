import React from 'react'
import ReactDOM from 'react-dom'

// higher-order component, adds vertical-filling behavior (take all vertical space possible)
export function verticalFilled (Component) {
  const VerticalFilledCom = React.createClass({
    getInitialState() {
      return { height: window.innerHeight }
    },

    componentDidMount() {
      this.calcHeight()
      // this.historyScrollTo()
      this.resizeListener = this.calcHeight
      window.addEventListener('resize', this.resizeListener)
    },

    componentWillUnmount() {
      window.removeEventListener('resize', this.resizeListener)
    },

    calcHeight() {
      var height = window.innerHeight
      if (this.refs && this.refs.el) {
        var rect = ReactDOM.findDOMNode(this.refs.el).getClientRects()[0]
        if (!rect)
          return
        height = window.innerHeight - rect.top
      }
      this.setState({ height: height })
    },

    getScrollTop() {
      const el = this.refs && this.refs.el
      if (!el) return 0
      if (el.getScrollTop)
        return el.getScrollTop() // use the child's impl
      return el.scrollTop
    },

    // check if a location is in scroll-view
    isPointVisible(left, top) {
      const el = this.refs && this.refs.el
      if (!el) return
      if (el.isPointVisible)
        return el.isPointVisible(left, top) // use the child's impl

      // TODO left

      if (el.scrollTop > top || el.scrollTop + this.state.height < top)
        return false

      return true
    },

    scrollTo(top) {
      const el = this.refs && this.refs.el
      if (!el) return
      if (el.scrollTo)
        return el.scrollTo(top) // use the child's impl

      // make sure it scrolls (may need some loading time)
      var n = 0
      const el2 = ReactDOM.findDOMNode(this.refs.el)
      function doit () {
        el2.scrollTop = top
        if (el2.scrollTop != top && ++n < 100)
          setTimeout(doit, 10)
      }
      doit()
    },

    // TODO - re-add?
    // historyScrollTo() {
    //   if (!this.props.id)
    //     return // we dont have an id, no scrolltop to record
    //   if (!history.state)
    //     return // no state in the history
    //   const vfScrollTops = history.state.vfScrollTops
    //   if (!vfScrollTops || !vfScrollTops[this.props.id])
    //     return // no scrolltop in the history for this one
    //   this.scrollTo(vfScrollTops[this.props.id])
    // },

    render() {
      return <Component ref="el" {...this.props} {...this.state} />
    }
  })
  return VerticalFilledCom;
}

// simple vertical-filled container
class _VerticalFilledContainer extends React.Component {
  render() {
    var style = { position: 'relative', overflow: 'auto' }
    
    if (this.props.height)
      style.height = this.props.height

    if (this.props.style && typeof this.props.style == 'object') {
      for (var k in this.props.style)
        style[k] = this.props.style[k]
    }

    return <div className="vertical-filled" {...this.props} style={style}>{this.props.children||''}</div>
  }
}
var VerticalFilledContainer = verticalFilled(_VerticalFilledContainer)
export default VerticalFilledContainer