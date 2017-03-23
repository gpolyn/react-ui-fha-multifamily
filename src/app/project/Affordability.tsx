import * as React from 'react';
import {OverrideableRadioControl} from '../shared/OverrideableRadioControl';

export class Affordability extends React.PureComponent<any, any> {
  render() {
    const { onChange, value } = this.props;
    const opts = [
      {label: 'market', value: 'market', id: 'market'},
      {label: 'affordable', value: 'affordable', id: 'affordable'},
      {label: 'subsidized', value: 'subsidized', id: 'subsidized'}
    ];
    return (
      <OverrideableRadioControl 
       id='affordability' 
       name='affordability'
       onChange={onChange} 
       value={value}
       data-options={opts}
       />
    );
  }
}
