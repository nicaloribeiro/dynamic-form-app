import React from 'react';
import { View, Text } from 'react-native'
import { RadioButton } from 'react-native-paper';

export default function Radio({ options, currentSelected, handleSelect, questionId }) {
    return (
        <RadioButton.Group value={currentSelected} onValueChange={(newValue) => handleSelect(questionId, newValue)}>
            {
                options?.map((option) => (
                    <View key={option}>
                        <RadioButton.Item label={option} value={option} />
                    </View>
                ))
            }
        </RadioButton.Group>
    )
}