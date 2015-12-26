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
    this.renderedDOM = findDOMNode(this.component);
  });

  it('render "a" element', function() {
    expect(this.renderedDOM.tagName).to.match(/a/i);
  });

  it('className should be equal "ok"', function() {
    expect(this.renderedDOM.className).to.eq('ok');
  });

});
