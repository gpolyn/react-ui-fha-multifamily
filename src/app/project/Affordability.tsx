import * as React from 'react';

export class Affordability extends React.PureComponent<any, any> {
  render() {
    return (
      <div id='affordability'>
          apartment rents are&nbsp;
        <label>market
          <input type='radio' name='affordability' value='market' checked={this.props.value === 'market' || !this.props.value} id='market' onChange={this.props.onChange}/>
        </label>
        <label>affordable
          <input type='radio' name='affordability' value='affordable' checked={this.props.value === 'affordable'} id='affordable' onChange={this.props.onChange}/>
        </label>
        <label>subsidized
          <input type='radio' name='affordability' value='subsidized' checked={this.props.value === 'subsidized'} id='subsidized' onChange={this.props.onChange}/>
        </label>
      </div>
    );
  }
}
