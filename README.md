# XML Form Renderer - React Native

A mobile application built with React Native that allows users to render forms dynamically from XML input. This cross-platform app supports multiple field types including text fields, date/time fields, radio buttons, and drawing fields.

## Features

- Render forms from predefined XML files
- Create forms from user-provided XML input
- Support for multiple field types:
  - Text fields with validation
  - Date/time fields with date picker
  - Radio buttons for multiple choice options
  - Drawing field for signatures or sketches
- Form validation for required fields
- Clean and responsive user interface
- Cross-platform compatibility (iOS and Android)

## Screenshots

*[Screenshots of the app will go here]*

## Installation

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- For Android development: Android Studio and Android SDK
- For iOS development: Xcode (Mac only)

### Setup Instructions

1. Clone the repository:
git clone https://github.com/yourusername/xml-form-renderer.git
cd xml-form-renderer

2. Install dependencies:
npm install
# or
yarn install

3. Start the development server:
npx expo start

## Running the App

### On Physical Devices

1. Install the Expo Go app from the App Store (iOS) or Google Play Store (Android)
2. Scan the QR code displayed in your terminal with:
   - iOS: Use the Camera app
   - Android: Use the Expo Go app

### On Emulators

- iOS Simulator: Press 'i' in the terminal where Expo is running
- Android Emulator: Press 'a' in the terminal (ensure your emulator is running)

## XML Format

The application accepts XML in the following format:

<?xml version="1.0" encoding="UTF-8"?>
<form title="Form Title">
  <field type="text" id="fieldId" label="Field Label" placeholder="Placeholder text" required="true" />
  <field type="datetime" id="dateField" label="Date Field" required="true" />
  <field type="radio" id="radioField" label="Radio Options">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </field>
  <field type="drawing" id="signature" label="Signature" width="300" height="200" />
</form>

## Environment Setup Tips

### Android SDK Setup

If you encounter issues with Android SDK path:

1. Set the ANDROID_HOME environment variable:
   - Windows: C:\Users\USERNAME\AppData\Local\Android\Sdk
   - macOS/Linux: $HOME/Library/Android/sdk or /Users/USERNAME/Library/Android/sdk

2. Add platform tools to PATH:
   - Windows: %ANDROID_HOME%\platform-tools
   - macOS/Linux: $ANDROID_HOME/platform-tools

## Troubleshooting

- "Failed to resolve the Android SDK path": Set up ANDROID_HOME environment variable
- "adb" is not recognized: Add platform-tools to your PATH
- Unable to resolve assets: Ensure you have created the assets directory with the required files
- XML parsing errors: Verify your XML structure matches the expected format

## Project Structure

XMLFormRenderer/
  ├── App.js                 // Main application component
  ├── app.json               // App configuration
  ├── babel.config.js        // Babel configuration
  ├── package.json           // Project dependencies
  ├── assets/                // App assets
  │   └── sample-form.xml    // Sample XML form
  └── components/            // App components
      ├── FormRenderer.js    // Form rendering component
      ├── DrawingField.js    // Drawing field component
      ├── TextField.js       // Text field component
      ├── DateTimeField.js   // Date/time field component
      └── RadioButtonField.js // Radio button field component

## Technologies Used

- React Native
- Expo
- react-native-gesture-handler
- react-native-reanimated
- react-native-svg
- react-native-paper
- react-native-modal-datetime-picker
- xml2js (or react-native-xml2js)



## Contributors

- Jaya Venkatesh 
