import * as React from 'react';

export class OnChangePayloadObjectInterceptor extends React.Component<any, any> {

  constructor(props: any){
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e: any) {
    this.props.onChange({[this.props.valKey]: e});
  }

  render() {
    const childWithProps = React.cloneElement(this.props.children, {onChange: this.onChange});
    return React.Children.only(childWithProps)
  }

}
