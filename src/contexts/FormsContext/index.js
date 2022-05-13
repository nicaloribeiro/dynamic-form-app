import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import forms from '../../formMock';

export const FormsContext = createContext({});

export function FormsProvider({ children }) {
    const [allForms, setAllForms] = useState([])
    const [currentForm, setCurrentFrom] = useState([]);

    const initialSetup = async () => {
        await verifyAndStoreForm();
        await loadForms();
    }

    const verifyAndStoreForm = async () => {
        const currentKeysStored = await getAllFormsStorageKeys();
        const formEntries = Object.entries(forms);
        const formsToStore = formEntries
            .filter((form) => !currentKeysStored.includes(form[0]))
            .map((formFiltered) => {
                const formKey = formFiltered[0];
                const formQuestions = formFiltered[1].map((question) => ({ ...question, answer: null }));
                return [formKey, JSON.stringify(formQuestions)]
            })
        await storeMultiForms(formsToStore);
    };

    const loadForms = async () => {
        const formKeys = await getAllFormsStorageKeys();
        const progress = await calculateFormProgress(formKeys);
        setAllForms(progress);
    };

    const getAllFormsStorageKeys = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            return keys;
        } catch (error) {

        }
    };

    const storeMultiForms = async (arrayOfForms) => {
        try {
            await AsyncStorage.multiSet(arrayOfForms);
        } catch (error) {

        }
    }

    const getMultipleForms = async (formKeys) => {
        try {
            const forms = await AsyncStorage.multiGet(formKeys);
            return forms;
        } catch (error) {

        }
    }

    const handleUpdateForm = async (selectedForm, questionId, questionAnswer) => {
        try {
            const actualAnswers = JSON.parse(selectedForm[1])
            const newAnswers = actualAnswers.map((question) => (
                question.id === questionId ?
                    {
                        ...question,
                        answer: questionAnswer
                    }
                    :
                    question
            ))
            await AsyncStorage.setItem(selectedForm[0], JSON.stringify(newAnswers));
            handleSelectForm(selectedForm[0])
        } catch (error) {

        }
    };

    const verifyFormQuestionDependencyAnswer = (quenstionId, expectedAnswer, questionList) => {
        const dependentQuestion = questionList.find((question) => question.id === quenstionId);
        return dependentQuestion && dependentQuestion.answer === expectedAnswer;
    };

    const calculateFormProgress = async (formKeys) => {
        try {
            const questionList = await getMultipleForms(formKeys);
            const formsProgress = questionList.map((currentForm) => (
                {
                    id: currentForm[0],
                    progress: getTotalQuestionsAndAnswers(currentForm[1])
                }
            ));
            return formsProgress;
        } catch (error) {

        }
    };

    const getTotalQuestionsAndAnswers = (currentForm) => {
        const currentFormParsed = JSON.parse(currentForm)
        const questionsAndAnswers = currentFormParsed.reduce((acc, curr) => {
            if (curr.answer) acc.answered += 1
            if (!curr.dependency || verifyFormQuestionDependencyAnswer(
                curr?.dependency?.id,
                curr?.dependency?.value,
                currentFormParsed
            )) acc.totalQuestions += 1
            return acc
        }, { totalQuestions: 0, answered: 0 })
        return questionsAndAnswers.answered === 0 ? 0 : (questionsAndAnswers.answered / questionsAndAnswers.totalQuestions).toFixed(2)
    }

    const handleSelectForm = async (formId) => {
        const form = await getMultipleForms([formId])
        setCurrentFrom(form)
    }

    return (
        <FormsContext.Provider value={{ initialSetup, handleSelectForm, handleUpdateForm, allForms, currentForm }}>
            {children}
        </FormsContext.Provider>
    );
};