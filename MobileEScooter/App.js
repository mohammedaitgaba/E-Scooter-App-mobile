import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View} from "react-native";
import Home from './Screens/Home'

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>dd</Text>
    // </View>
      <Home/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});
