import React from 'react';
import { Picker } from '@react-native-picker/picker';

export default function DropdownSelect({ options, currentSelected, questionId, handleSelect }) {
    return (
        <Picker
            style={{ backgroundColor: '#ededed' }}
            selectedValue={currentSelected || ''}
            onValueChange={(itemValue, index) =>
                handleSelect(questionId, itemValue)
            }>
            <Picker.Item label="Selecione" value='' />
            {
                options.map((option) => (
                    <Picker.Item key={option} label={option} value={option} />
                ))
            }
        </Picker>
    )
}