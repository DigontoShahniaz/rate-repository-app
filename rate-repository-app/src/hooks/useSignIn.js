import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ 
      variables: { 
        credentials: { 
          username, 
          password 
        } 
      } 
    });
    
    if (data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      navigate('/'); 
    }
    
    return data;
  };

  return [signIn, result];
};

export default useSignIn;