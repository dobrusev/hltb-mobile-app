import { StackNavigator } from 'react-navigation';

import Home from './app/screens/Home';
import About from './app/screens/About';
import SearchResult from './app/screens/SearchResult';

export default StackNavigator ({
    Home: { screen: Home },
    About: { screen: About },
    SearchResult: { screen: SearchResult },
  },
  {
    initialRouteName: 'Home'
  }
);