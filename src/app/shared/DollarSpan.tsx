import * as React from 'react';

export class DollarSpan extends React.PureComponent<any, {}> {

  constructor(props: any){
    super(props);
  }

  private fmt(num: number){
    // http://www.jacklmoore.com/notes/rounding-in-javascript
    const rounded = Number(String(Math.round(Number(num+'e2')))+'e-2');
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render(){
    return(
      <span id={this.props.id} className={this.props.className}>
          ${this.fmt(this.props.value)}
      </span>
    );
  }
}
