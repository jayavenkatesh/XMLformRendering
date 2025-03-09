import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const RadioButtonField = ({ id, label, options, value, onChange }) => {
    // Ensure options is always an array
    const optionsArray = Array.isArray(options) ? options : [];

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            {optionsArray.map((option, index) => (
                <View key={index} style={styles.radioOption}>
                    <RadioButton
                        value={option.value}
                        status={value === option.value ? 'checked' : 'unchecked'}
                        onPress={() => onChange(option.value)}
                        color="#007AFF"
                    />
                    <Text style={styles.radioLabel}>{option._}</Text>
                </View>
            ))}
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
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    radioLabel: {
        fontSize: 16,
        marginLeft: 8,
    },
});

export default RadioButtonField;