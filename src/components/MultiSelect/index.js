import React, { useState, useEffect } from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MultiSelect({ options, questionId, handleSelect, currentSelected }) {
    const [items, setItems] = useState(options.map((option) => ({ id: option, name: option })))

    const [selectedItems, setSelectedItems] = useState(currentSelected || [])

    const handleSelectChange = (item) => {
        setSelectedItems(item);
        handleSelect(questionId, item.length > 0 ? item : null);
    };

    useEffect(() => {
        setItems(options.map((option) => ({ id: option, name: option })))
    }, [options]);

    return (
        <>
            <SectionedMultiSelect
                items={items}
                IconRenderer={Icon}
                uniqueKey="id"
                selectText="Selecione"
                onSelectedItemsChange={(item) => handleSelectChange(item)}
                selectedItems={selectedItems}
                showChips
                searchPlaceholderText="Buscar item"
                confirmText="Confirmar"
            />
        </>
    )
}