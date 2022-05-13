import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import FormCard from '../../components/FormCard';
import { FormsContext } from '../../contexts/FormsContext';

export default function HomeScreen({ navigation }) {

    const { allForms, initialSetup, handleSelectForm } = useContext(FormsContext);

    useEffect(() => {
        const focusSetup = navigation.addListener('focus', () => {
            initialSetup();
        });
        return focusSetup;
    }, [navigation]);

    useEffect(() => {
        console.log(allForms)
    }, [allForms]);

    const handleClickForm = async (id) => {
        await handleSelectForm(id)
        navigation.navigate('Form', {
            formId: id
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    allForms?.length > 0 ?
                        allForms.map((form, index) => (
                            <FormCard key={form.id} formNumber={index + 1} totalComplete={form.progress} handlePress={() => handleClickForm(form.id)} />
                        ))
                        :
                        <Text>Nenhum formulário encontrado</Text>
                }
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
        padding: 15
    },
});