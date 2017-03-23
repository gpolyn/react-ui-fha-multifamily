import * as React from 'react';

export class SharedInput extends React.Component<any, any> {

  private lastPropsValue: number;

  constructor(props: any) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.currentValue = this.currentValue.bind(this);
    this.lastPropsValue = props.value;
    this.state = {value: this.props.value}
  }

  protected onChange(e: any){
    console.log('onChange', e);
    let val = e.target.value;
    this.props.onChange(val);
    this.setState(prevState => ({...prevState, value: val}));
  }

  protected currentValue(){
    console.log('currentValue', this.lastPropsValue, this.props.value);
    if (this.lastPropsValue != this.props.value) {
      this.state.value = this.props.value; // don't re-render!
      this.lastPropsValue = this.props.value;
    } 
    return this.state.value;
  }

  render() {
    if (this.lastPropsValue != this.props.value) {
      this.state.value = this.props.value;
      this.lastPropsValue = this.props.value;
    } 
    return(
      <input {...this.props} value={this.state.value} onChange={this.onChange} />
    );
  }
}
