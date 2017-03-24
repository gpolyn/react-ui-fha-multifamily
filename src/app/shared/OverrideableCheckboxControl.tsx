import * as React from 'react';

export class OverrideableCheckboxControl extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {value: props.value === true};
    this.onChange = this.onChange.bind(this);
  }

  protected onChange(e: any){
    let val = this.state.value;
    this.setState(prevState => ({...prevState, value: !val}));
  }

  shouldComponentUpdate(nextProps, nextState){

    if (nextProps.value === nextState.value && nextState.value === this.state.value){
      return false;
    } else {

      this.state.value = nextProps.value;

      if (nextState.value !== this.props.value && nextProps.value === this.props.value){
        this.props.onChange(nextState.value);
      }
    }
    /*
    if (nextState.value !== this.state.value){
      if (nextState.value !== nextProps.value && nextProps.value === this.props.value){
        this.props.onChange(nextState.value);
      }
      return true
    }

    if (nextProps.value !== this.props.value){
      if (nextState.value !== nextProps.value){
        nextState.value = nextProps.value;
        this.props.onChange(nextState.value);
        return true
      }
      return false;
    }
    */

    return true;
    
  }

  render() {
    console.log('OverrideableCheckboxControl#render')
    return(
      <input {...this.props} onChange={this.onChange} checked={this.state.value} type='checkbox' />
    );
  }

}
