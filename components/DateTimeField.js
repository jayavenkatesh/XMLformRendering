import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateTimeField = ({ id, label, required, value, onChange }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        onChange(date);
        hideDatePicker();
    };

    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleString();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label} {required && <Text style={styles.required}>*</Text>}
            </Text>

            <TouchableOpacity
                style={styles.dateButton}
                onPress={showDatePicker}
            >
                <Text style={styles.dateButtonText}>
                    {value ? formatDate(value) : 'Select Date and Time'}
                </Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={value || new Date()}
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
    required: {
        color: 'red',
    },
    dateButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#f9f9f9',
    },
    dateButtonText: {
        fontSize: 16,
        color: '#333',
    },
});

export default DateTimeField;