import React from 'react'
import { Icon } from 'semantic-ui-react'

const Footer = () => (
  <div style={{ position: 'absolute', height: 70, bottom: 35, width: '100%', background: '#080B1A', borderTopStyle: 'solid', borderTopWidth: 2, borderTopColor: '#1A253F', padding: 25 }}>
    <Icon name='circle' style={{ color: 'green', marginLeft: 10 }} />
    <label>connected</label>
    <label style={{ float: 'right' }}>version: 0.1.0</label>
  </div>
)

export default Footer
