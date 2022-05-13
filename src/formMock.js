const forms = {
    form1: [
        {
            id: 1,
            component: 'Radio',
            options: ['YES', 'NO']
        },
        {
            id: 2,
            component: 'MultiSelect',
            options: ['Ayrton', 'Ulisses', 'Eu', 'Você']
        },

        {
            id: 3,
            component: 'Input',
            placeholder: 'Digite algo aqui',
            dependency: {
                id: 1,
                value: 'YES'
            }
        },
    ],
    form2: [
        {
            id: 1,
            component: 'Photo',
        },
        {
            id: 2,
            component: 'DropdownSelect',
            options: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4']
        },
        {
            id: 3,
            component: 'Calendar',
            dependency: {
                id: 2,
                value: 'Opt 2'
            }
        },
    ]
}

export default forms