import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: '#d73a4a', // Red border for errors
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
  errorText: {
    color: '#d73a4a', // Red error text
    marginBottom: 5,
    fontSize: theme.fontSizes.body,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  const isFieldInvalid = (field) => 
    formik.touched[field] && formik.errors[field];

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          isFieldInvalid('username') && styles.errorInput,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {isFieldInvalid('username') && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          isFieldInvalid('password') && styles.errorInput,
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
      />
      {isFieldInvalid('password') && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;