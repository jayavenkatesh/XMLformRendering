import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import TextField from './TextField';
import DateTimeField from './DateTimeField';
import RadioButtonField from './RadioButtonField';
import DrawingField from './DrawingField';

const FormRenderer = ({ formData }) => {
    const [formValues, setFormValues] = useState({});

    const handleFieldChange = (id, value) => {
        setFormValues(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        // Validate required fields
        const missingFields = formData.fields
            .filter(field => field.required === 'true' && !formValues[field.id])
            .map(field => field.label);

        if (missingFields.length > 0) {
            Alert.alert(
                'Missing Information',
                `Please fill in the following required fields: ${missingFields.join(', ')}`
            );
            return;
        }

        // If validation passes, show the submitted data
        Alert.alert(
            'Form Submitted',
            JSON.stringify(formValues, null, 2),
            [{ text: 'OK' }]
        );

        console.log('Form values:', formValues);
    };

    const renderField = (field) => {
        switch (field.type) {
            case 'text':
                return (
                    <TextField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        required={field.required === 'true'}
                        value={formValues[field.id] || ''}
                        onChange={(value) => handleFieldChange(field.id, value)}
                    />
                );

            case 'datetime':
                return (
                    <DateTimeField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        required={field.required === 'true'}
                        value={formValues[field.id]}
                        onChange={(value) => handleFieldChange(field.id, value)}
                    />
                );

            case 'radio':
                const options = field.options || [];
                return (
                    <RadioButtonField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        options={options}
                        value={formValues[field.id]}
                        onChange={(value) => handleFieldChange(field.id, value)}
                    />
                );

            case 'drawing':
                return (
                    <DrawingField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        width={parseInt(field.width) || 300}
                        height={parseInt(field.height) || 200}
                        value={formValues[field.id]}
                        onChange={(value) => handleFieldChange(field.id, value)}
                    />
                );

            default:
                return (
                    <Text key={field.id} style={styles.unsupportedField}>
                        Unsupported field type: {field.type}
                    </Text>
                );
        }
    };

    if (!formData || !formData.fields) {
        return <Text style={styles.errorText}>No form data available</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>{formData.title}</Text>

            {formData.fields.map(field => renderField(field))}

            <View style={styles.submitButton}>
                <Button title="Submit Form" onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    formTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        margin: 20,
    },
    unsupportedField: {
        color: 'orange',
        padding: 10,
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 5,
        marginVertical: 10,
    },
    submitButton: {
        marginTop: 20,
    },
});

export default FormRenderer;