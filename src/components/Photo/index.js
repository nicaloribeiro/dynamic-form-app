import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import { View, Button, Image, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
export default function Photo({ currentSelected, questionId, handleUpdateFiles }) {
    const [result, setResult] = useState(currentSelected || [])

    const handleUploadFiles = (selectedFiles) => {
        const filesSelectedInfo = selectedFiles.map((file) => (
            {   id: uuid.v4(),
                fileName: file.name,
                filePath: file.uri
            }
        ))
        handleUpdateFiles(questionId, [...result, ...filesSelectedInfo])
        setResult((prevState) => [...prevState, ...filesSelectedInfo])
    }

    const handleRemoveFile = (id) => {
        const filesAfterRemove = result.filter((file) => file.id !== id);
        handleUpdateFiles(questionId, filesAfterRemove);
        setResult(filesAfterRemove);
    }

    return (
        <>
            <Button
                title="Selecionar fotos"
                onPress={async () => {
                    try {
                        const pickerResult = await DocumentPicker.pickMultiple({ type: "image/*" })
                        handleUploadFiles(pickerResult)
                    } catch (e) {
                    }
                }}
            />
            <ScrollView horizontal>
                {
                    result.length > 0 &&
                    result.map((file) => (
                        <View key={file.id} style={{ margin: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Image  source={{ uri: file.filePath }}
                                style={{ width: 80, height: 80, marginBottom: 10 }} />
                            <Button title='Remover' onPress={() => handleRemoveFile(file.id)}/>
                        </View>
                    ))
                }
            </ScrollView>
        </>
    )
}