import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground || '#24292e',
    padding: 10,
  },
  scrollView: {
    flexDirection: 'row',
    gap: 15,
  },
  tab: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
});

const AppBarTab = ({ children, to }) => {
  return (
    <Link to={to} component={Pressable}>
      <Text style={styles.tab}>{children}</Text>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/signin">Sign in</AppBarTab>
        {/* Add more tabs here to test scrolling */}
      </ScrollView>
    </View>
  );
};

export default AppBar;