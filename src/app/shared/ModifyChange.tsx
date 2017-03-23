import * as React from 'react';

export function withModifiedOnChange(WrappedComponent: any){

  return class extends React.Component<any, any> {

    constructor(props: any){
      super(props);
      console.log('HEY!', WrappedComponent)
    }

    onChange(data: any){
      
    }

    render(){
      return <WrappedComponent />
    }

  }

}
