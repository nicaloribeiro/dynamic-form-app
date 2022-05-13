import React, { useState } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

export default function Calendar({ currentSelected, questionId, handleChangeDate }) {
    const defaultDate = new Date()
    const [open, setOpen] = useState(false)
    return (
        <>
            <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>{currentSelected ? `Data: ${new Date(currentSelected).toLocaleDateString('pt-BR')}` : 'Nenhuma data selecionada'}</Text>
            <Button style={{ backgroundColor: 'white', margin: 5 }} onPress={() => setOpen(true)}>
                Selecionar data
            </Button>
            <Button style={{ backgroundColor: 'white', margin: 5 }} onPress={() => handleChangeDate(questionId, null)}>
                Remover data
            </Button>

            <DatePicker
                modal
                open={open}
                date={currentSelected ? new Date(currentSelected) : defaultDate}
                mode="date"
                onConfirm={(date) => {
                    handleChangeDate(questionId, date)
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                locale="pt-BR" />
        </>
    )
}