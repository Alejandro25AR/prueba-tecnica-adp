import { LinearGradient } from "expo-linear-gradient"
import { Pressable, StyleSheet, Text, View } from "react-native"



export default function ButtonGradient({onPress}:{onPress:() => void}) {
  return(
    <Pressable onPress={onPress}>
      <LinearGradient
        // Button Linear Gradient
        colors={['#5760FF', '#4341F2']}
        start={{x:0, y:0}}
        end={{x:1, y:1}}
        style={styles.button}
      >
        <Text style={styles.text}>Iniciar Sesión</Text>
      </LinearGradient>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
});