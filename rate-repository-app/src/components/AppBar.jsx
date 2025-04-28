import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';

import theme from '../theme';
import Text from './Text';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  },
});

const AppBarTab = ({ children, onPress, ...props }) => {
  if (onPress) {
    return (
      <Text 
        fontWeight="bold" 
        style={[styles.tabText, styles.tabContainer]}
        onPress={onPress}
      >
        {children}
      </Text>
    );
  }

  return (
    <Link style={styles.tabTouchable} {...props}>
      <View style={styles.tabContainer}>
        <Text fontWeight="bold" style={styles.tabText}>
          {children}
        </Text>
      </View>
    </Link>
  );
};

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data } = useQuery(ME);
  const currentUser = data?.me;

  const signOut = async () => {
    // Remove the access token from storage
    await authStorage.removeAccessToken();
    
    // Reset Apollo Client store to clear cache and re-execute queries
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {currentUser ? (
          <AppBarTab onPress={signOut}>Sign out</AppBarTab>
        ) : (
          <AppBarTab to="/sign-in">Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;