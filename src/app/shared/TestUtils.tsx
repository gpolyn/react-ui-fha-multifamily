import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';

export default function setup(props: any, componentUnderTest: any) {

  const renderer = TestUtils.createRenderer();
  renderer.render(React.createElement(componentUnderTest, {...props}));
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}
