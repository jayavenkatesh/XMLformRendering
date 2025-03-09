import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TextField = ({ id, label, placeholder, required, value, onChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label} {required && <Text style={styles.required}>*</Text>}
            </Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder || ''}
                value={value}
                onChangeText={onChange}
            />
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
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 10,
        fontSize: 16,
    },
    required: {
        color: 'red',
    },
});

export default TextField;