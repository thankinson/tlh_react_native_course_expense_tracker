import { Pressable, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

export default function IconButton({icon, size, color, onPress}){
  return (
    <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
      <View style={styles.buttoncontainer}>
        <Ionicons name={icon} color={color} size={size} />
      </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  buttoncontainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2
  },
  pressed:{
    opacity: 0.75
  }
})