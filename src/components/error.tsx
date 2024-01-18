import React from "react";

interface IError{
  stack:any,
  info:any
}
export class ErrorBoundary extends React.Component<
  { fallback: (props:IError) => JSX.Element ; children: React.ReactNode },
  { hasError: boolean,error:IError  }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false,error:{
      stack:undefined,
        info:undefined
      }};
  }
  componentDidCatch(error: any, info: any) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    this.setState({error:{
        stack:error,
        info
      },hasError:true})
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <this.props.fallback {...this.state.error}/>
    }

    return this.props.children;
  }
}
