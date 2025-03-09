import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, SafeAreaView, TextInput, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { parseString } from 'xml2js';
import FormRenderer from './components/FormRenderer';

export default function App() {
    const [formData, setFormData] = useState(null);
    const [xmlInput, setXmlInput] = useState('');
    const [showXmlInput, setShowXmlInput] = useState(false);

    const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<form title="Customer Feedback Form">
  <field type="text" id="name" label="Full Name" placeholder="Enter your full name" required="true" />
  <field type="text" id="email" label="Email Address" placeholder="Enter your email address" required="true" />
  <field type="datetime" id="visitDate" label="Date of Visit" required="true" />
  <field type="radio" id="satisfaction" label="How satisfied were you with our service?">
    <option value="5">Very Satisfied</option>
    <option value="4">Satisfied</option>
    <option value="3">Neutral</option>
    <option value="2">Dissatisfied</option>
    <option value="1">Very Dissatisfied</option>
  </field>
  <field type="drawing" id="signature" label="Please sign below" width="300" height="200" />
</form>`;

    const loadPredefinedXml = () => {
        // Use the sample XML
        parseXml(sampleXml);
        setShowXmlInput(false);
    };

    const pickXmlFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'text/xml',
                copyToCacheDirectory: true,
            });

            if (result.canceled) {
                console.log('User cancelled the file picker');
                return;
            }

            const fileUri = result.assets[0].uri;
            const fileContent = await FileSystem.readAsStringAsync(fileUri);
            parseXml(fileContent);
            setShowXmlInput(false);
        } catch (error) {
            Alert.alert('Error', 'Failed to read the XML file: ' + error.message);
            console.error('Error picking or reading file:', error);
        }
    };

    const showXmlInputForm = () => {
        setFormData(null);
        setShowXmlInput(true);
    };

    const submitXmlInput = () => {
        if (!xmlInput.trim()) {
            Alert.alert('Error', 'Please enter XML content');
            return;
        }
        parseXml(xmlInput);
    };

    const parseXml = (xmlContent) => {
        parseString(xmlContent, { explicitArray: false }, (error, result) => {
            if (error) {
                Alert.alert('Error', 'Invalid XML format: ' + error.message);
                console.error('XML parsing error:', error);
                return;
            }

            try {
                if (!result.form || !result.form.field) {
                    throw new Error('Missing form or field elements');
                }

                // Ensure fields are always in array format
                const fields = Array.isArray(result.form.field)
                    ? result.form.field
                    : [result.form.field];

                // Process fields to ensure proper structure
                const processedFields = fields.map(field => {
                    // Check if this is a radio field with options
                    if (field.type === 'radio' && field.option) {
                        const options = Array.isArray(field.option) ? field.option : [field.option];
                        return { ...field, options };
                    }
                    return field;
                });

                setFormData({
                    title: result.form.title || 'Form',
                    fields: processedFields
                });
            } catch (err) {
                Alert.alert('Error', 'Invalid form structure: ' + err.message);
                console.error('Form processing error:', err);
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>XML Form Renderer</Text>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Render Form from XML File"
                        onPress={pickXmlFile}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Use Predefined XML"
                        onPress={loadPredefinedXml}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Render Form from XML Input"
                        onPress={showXmlInputForm}
                    />
                </View>

                {showXmlInput && (
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Enter XML:</Text>
                        <TextInput
                            style={styles.xmlInput}
                            multiline
                            numberOfLines={10}
                            value={xmlInput}
                            onChangeText={setXmlInput}
                            placeholder="Paste your XML here..."
                        />
                        <Button title="Render Form" onPress={submitXmlInput} />
                    </View>
                )}

                {formData && (
                    <FormRenderer formData={formData} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        marginBottom: 15,
    },
    inputContainer: {
        marginVertical: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    xmlInput: {
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
    },
});