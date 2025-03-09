import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    runOnJS
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const DrawingField = ({ id, label, width, height, value, onChange }) => {
    const [paths, setPaths] = useState([]);
    const [currentPath, setCurrentPath] = useState('');

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event) => {
            const newPath = `M${event.x},${event.y}`;
            runOnJS(setCurrentPath)(newPath);
        },
        onActive: (event) => {
            const updatedPath = `${currentPath} L${event.x},${event.y}`;
            runOnJS(setCurrentPath)(updatedPath);
        },
        onEnd: () => {
            runOnJS(setPaths)([...paths, currentPath]);
            // Save the drawing data
            const drawingData = [...paths, currentPath];
            runOnJS(onChange)(drawingData);
        },
    });

    const clearDrawing = () => {
        setPaths([]);
        setCurrentPath('');
        onChange([]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <View style={[styles.drawingContainer, { width, height }]}>
                <PanGestureHandler onGestureEvent={panGestureEvent}>
                    <Animated.View style={[styles.drawingArea, { width, height }]}>
                        <Svg width={width} height={height}>
                            {/* Draw all saved paths */}
                            {paths.map((d, index) => (
                                <Path
                                    key={index}
                                    d={d}
                                    stroke="black"
                                    strokeWidth={2}
                                    fill="none"
                                />
                            ))}

                            {/* Draw current path */}
                            {currentPath ? (
                                <Path
                                    d={currentPath}
                                    stroke="black"
                                    strokeWidth={2}
                                    fill="none"
                                />
                            ) : null}
                        </Svg>
                    </Animated.View>
                </PanGestureHandler>
            </View>

            <Button title="Clear Drawing" onPress={clearDrawing} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    drawingContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginBottom: 8,
        backgroundColor: 'white',
    },
    drawingArea: {
        backgroundColor: 'transparent',
    },
});

export default DrawingField;