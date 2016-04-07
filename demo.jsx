import React from 'react'
import VerticalFilledContainer from './index'

export default class VerticalFilledDemo extends React.Component {
  render() {
    return <div>
      <h1>patchkit-vertical-filled</h1>
      <section className="demo-vertical-filled">
        <header>&lt;VerticalFilledContainer&gt;</header>
        <div className="content">
          <VerticalFilledContainer style={{ border: '1px solid #ccc' }}>
            <div style={{ padding: 10 }}>
              This container will extend to the bottom of the screen, even when you resize.
            </div>
          </VerticalFilledContainer>
        </div>
      </section>
    </div>
  }
}