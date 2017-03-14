import * as React from 'react';

export class MaskedNumericInput extends React.PureComponent<any, {}> {

  constructor(props: any) {
    super(props);
    this.maskInput = this.maskInput.bind(this);
  }

  protected maskInput(e: any){
    const val = e.target.value;
    if (this.props.max && val > this.props.max){
      this.props.onChange(this.props.max);
    } else if (this.props.min && val < this.props.min) {
      this.props.onChange(this.props.min);
    } else {
      this.props.onChange(val);
    }
  }

  render() {
    return(
      <input id={this.props.id} value={this.props.value} className={this.props.className} onChange={this.maskInput} />
    );
  }
}
