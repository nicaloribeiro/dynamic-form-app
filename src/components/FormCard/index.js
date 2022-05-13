import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';

const FormCard = ({ formNumber, totalComplete, handlePress }) => {

    return (
        <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
            <View>
                <Text style={styles.formTitle}>Formulario {formNumber}</Text>
            </View>
            <View>
                <Text style={styles.totalCompleteText}>{totalComplete*100}%</Text>
                <ProgressBar progress={parseFloat(totalComplete)} color='#4BB543' />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        marginVertical: 10,
        minHeight: 90,
        padding: 10,
        borderRadius: 12,
    },
    formTitle: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    totalCompleteText: {
        textAlign: 'right'
    }
});

export default FormCard