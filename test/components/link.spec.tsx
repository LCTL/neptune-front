import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { Link } from '../../src/components/shared/links';
import * as app from '../../src/app';

const ReactShallowRenderer = ReactTestUtils.createRenderer();

describe('Link', () => {

  beforeEach(function() {
    this.link = <Link to="/x" className="ok">test</Link>;
    this.component = ReactTestUtils.renderIntoDocument(this.link);
    this.renderedDOM = ReactTestUtils.findRenderedDOMComponentWithClass(this.component, 'ok');
  });

  it('should render "a" element', function() {
    expect(this.renderedDOM.tagName).to.match(/a/i);
  });

  it('should render className and equal "ok"', function() {
    expect(this.renderedDOM.className).to.eq('ok');
  });

  it('should render "test" in child', function() {
    expect(this.renderedDOM.innerHTML).to.eq('test');
  });

});
