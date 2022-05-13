import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { FormsContext } from '../../contexts/FormsContext';
import Input from '../../components/Input';
import Radio from '../../components/Radio';
import DropdownSelect from '../../components/DropdownSelect';
import Calendar from '../../components/Calendar';
import MultiSelect from '../../components/MultiSelect';
import Photo from '../../components/Photo';

export default function AnswersScreen({ navigation, route }) {

    const { currentForm, handleUpdateForm } = useContext(FormsContext);
    const [currentFormController, setCurrentFromController] = useState({});

    const { formId } = route.params

    const componentMap = (question) => {
        const componentMap = {
            'Radio': <Radio options={question.options} currentSelected={question.answer} questionId={question.id} handleSelect={handleUpdateQuestion} />,
            'MultiSelect': <MultiSelect options={question.options} currentSelected={question.answer} questionId={question.id} handleSelect={handleUpdateQuestion} />,
            'Input': <Input placeholder={question.placeholder} storedValue={question.answer} questionId={question.id} handleOnBlur={handleUpdateQuestion} />,
            'Photo': <Photo currentSelected={question.answer} questionId={question.id} handleUpdateFiles={handleUpdateQuestion}/>,
            'DropdownSelect': <DropdownSelect options={question.options} currentSelected={question.answer} questionId={question.id} handleSelect={handleUpdateQuestion} />,
            'Calendar': <Calendar currentSelected={question.answer} questionId={question.id} handleChangeDate={handleUpdateQuestion}/>
        }

        return componentMap[`${question.component}`]
    }
s
    useEffect(() => {
        const formParsed = JSON.parse(currentForm.flat()[1])
        const formObject = formParsed.reduce((acc, curr) => {
            acc[`${curr.id}`] = curr
            return acc
        }, {})
        setCurrentFromController(formObject)
    }, [currentForm])

    useEffect(() => console.log(currentFormController), [currentFormController])

    const handleUpdateQuestion = (questionId, questionAnswer) => {
        handleUpdateForm(currentForm.flat(), questionId, questionAnswer)
    }

    const verifyDependency = (question) => {
        if (!question?.dependency || currentFormController[`${question?.dependency?.id}`]?.answer === question?.dependency?.value) {
            return true
        }
        if (Object.keys(currentFormController).length > 0 && question?.answer) handleUpdateQuestion(question?.id, null)
        return false
    }

    return (
        <ScrollView style={styles.container}>
            {
                JSON.parse(currentForm.flat()[1])
                    .map((question, index) => (
                        verifyDependency(question) ?
                            <View key={question.id} style={styles.card}>
                                <Text style={styles.questionText}>Questao {index + 1}</Text>
                                {componentMap(question)}
                            </View>
                            :
                            null
                    ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
        padding: 10
    },
    card: {
        width: '100%',
        height: 'auto',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        marginVertical: 20
    },
    questionText: {
        fontSize: 14,
        marginBottom: 10
    }
});