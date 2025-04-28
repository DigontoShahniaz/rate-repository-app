
const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.roundness,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  error: {
    backgroundColor: theme.colors.error,
  },
  text: {
    color: 'white',
  },
});

const Button = ({ children, style, color = 'primary', ...props }) => {
  const buttonStyle = [
    styles.container,
    styles[color],
    style,
  ];

  return (
    <Pressable {...props}>
      <View style={buttonStyle}>
        <Text style={styles.text} fontWeight="bold">{children}</Text>
      </View>
    </Pressable>
  );
};