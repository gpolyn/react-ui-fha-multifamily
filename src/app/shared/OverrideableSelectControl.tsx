import * as React from 'react';

export class OverrideableSelectControl extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {value: this.props.value};
    this.onChange = this.onChange.bind(this);
  }

  protected onChange(e: any){
    let val = e.target.value;
    this.setState(prevState => ({...prevState, value: val}));
  }

  shouldComponentUpdate(nextProps, nextState){
    
    if (nextState.value === nextProps.value){
      return false;
    } else {
      this.state.value = nextProps.value;
      this.props.onChange(nextState.value);
    }

    return true;

  }

  render() {
    console.log("OverrideableSelectControl#render")
    const options = this.props['data-options'];
    const optionEles = options.map(opt =>
      <option key={opt} value={opt}>{opt}</option>
    );
    return(
      <select {...this.props} value={this.state.value} onChange={this.onChange}>
        {optionEles}
      </select>
    );
  }

}
