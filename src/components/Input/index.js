import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function Input({ placeholder, storedValue, handleOnBlur, questionId }) {
    const [questionText, setQuestionText] = useState(storedValue || '');

    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={questionText}
            onChangeText={text => setQuestionText(text)}
            onBlur={() => handleOnBlur(questionId, questionText)}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        backgroundColor: 'white'
    },
});