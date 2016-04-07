# Vertical Filled Container

A container-component that will take the full vertical space, and resize with the window.

```jsx
import VerticalFilledContainer from 'patchkit-vertical-filled'

<VerticalFilledContainer>
  This container will extend to the bottom of the screen, even when you resize.
</VerticalFilledContainer>
```

You can use the decorator to add the behavior to another component.
This is the actual definition of `<VerticalFilledContainer>`:

```jsx
import { verticalFilled } from 'patchkit-vertical-filled'

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
```