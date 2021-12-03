import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

function AnimatedStyleUpdateExample(props) {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Animated.View
        style={[
          { width: 100, height: 80, backgroundColor: "black", margin: 30 },
          style,
        ]}
      />
      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />
    </View>
  );
}

const circleRadius = 30;
const windowWidth = Dimensions.get("window").width;

class Circle extends React.Component {
  _touchX = new Animated.Value(windowWidth / 2 - circleRadius);
  _onPanGestureEvent = Animated.event([{ nativeEvent: { x: this._touchX } }], {
    useNativeDriver: true,
  });
  render() {
    return (
      <PanGestureHandler onGestureEvent={this._onPanGestureEvent}>
        <Animated.View
          style={{
            flex: 1,
            marginTop: 8,
            justifyContent: "center",
            backgroundColor: "#acacac",
          }}
        >
          <Animated.View
            style={[
              {
                backgroundColor: "#42a5f5",
                borderRadius: circleRadius,
                height: circleRadius * 2,
                width: circleRadius * 2,
              },
              {
                transform: [
                  {
                    translateX: Animated.add(
                      this._touchX,
                      new Animated.Value(-circleRadius)
                    ),
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.exampleContainer}>
        <Text style={{ fontSize: 12 }}>
          reanimated - toggle button to trigger animation
        </Text>
        <AnimatedStyleUpdateExample />
      </View>
      {/*
      <View style={styles.exampleContainer}>
        <Text style={{ fontSize: 12 }}>
          gesture-handler - drag in the grey region
        </Text>

        <Circle />
      </View>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: 24,
  },
  exampleContainer: {
    flex: 1,
    flexDirection: "column",
    borderWidth: 2,
    borderRadius: 2,
    margin: 8,
    padding: 8,
    justifyContent: "space-around",
  },
});
