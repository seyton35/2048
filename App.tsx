import { Provider } from 'react-redux';

import Main from './src/Main';
import store from './src/store';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}