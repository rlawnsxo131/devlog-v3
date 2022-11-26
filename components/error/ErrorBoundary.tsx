import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

import FullHeightPageBox from '../system/FullHeightPageBox';
import ErrorScreen from './ErrorScreen';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log('error: ', error);
    console.log('errorInfo: ', errorInfo);
  }

  handleResolveErrorAndRefresh = () => {
    this.setState(
      {
        hasError: false,
      },
      () => {
        location.reload();
      },
    );
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <FullHeightPageBox>
          <ErrorScreen
            type="Unknown"
            onResolveErrorAndRefresh={this.handleResolveErrorAndRefresh}
          />
        </FullHeightPageBox>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
