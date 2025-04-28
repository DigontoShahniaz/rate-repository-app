import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import ReviewForm from './ReviewForm';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';
import SingleRepository from './SingleRepository';
import SignUp from './SignUp';
import UserReviews from './UserReviews';


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="sign-in" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/repository/:id" element={<SingleRepository />} exact />
        <Route path="/create-review" element={<ReviewForm />} exact />
        <Route path="/sign-up" element={<SignUp />} exact />
        <Route path="/my-reviews" element={<UserReviews />} exact />

      </Routes>
    </View>
  );
};

export default Main;