jest.unmock('./BpkLink.jsx')

import React from 'react'
import { shallow } from 'enzyme'
import BpkLink from './BpkLink.jsx'

describe('BpkLink', () => {
  it('should render the correct element', () => {
    const wrapper = shallow(<BpkLink href='#'>Link</BpkLink>)
    expect(wrapper.text()).toEqual('Link')
    expect(wrapper.name()).toEqual('a')
    expect(wrapper.prop('href')).toEqual('#')
  })

  it('should render the correct class', () => {
    const wrapper = shallow(<BpkLink href='#'>Link</BpkLink>)
    expect(wrapper.prop('className')).toEqual('bpk-link')
  })
})
