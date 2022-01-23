module.exports = {
    getAllQuestions() {
        return [
            {
                label: 'What is your age',
                type: 'radio',
                placeholder: 'What is your age',
                is_required: true,
                options: [
                    {
                        label: '<20',
                        value: '<20',
                        route_to_label: 'What is your gender',
                    },
                    {
                        label: '>=20',
                        value: '>=20',
                        route_to_label: 'What is your gender',
                    },
                ],
            },
            {
                label: 'What is your gender',
                type: 'radio',
                placeholder: 'What is your gender',
                is_required: true,
                options: [
                    {
                        label: 'Male',
                        value: 'M',
                        route_to_label: 'Are you on Medications',
                    },
                    {
                        label: 'Female',
                        value: 'F',
                        route_to_label: 'Are you on Medications',
                    },
                ],
            },
            {
                label: 'Are you on Medications',
                type: 'radio',
                placeholder: 'Are you on Medications',
                is_required: true,
                options: [
                    {
                        label: 'Yes',
                        value: 'Yes',
                        route_to_label: 'Any you having any of the following conditons? (Mark multiple)',
                    },
                    {
                        label: 'No',
                        value: 'No',
                        route_to_label: 'Are you currently using Ibuprofen medication?',
                    },
                ],
            },
            {
                label: 'Are you currently using Ibuprofen medication?',
                type: 'radio',
                placeholder: 'Are you currently using Ibuprofen medication?',
                is_required: true,
                options: [
                    {
                        label: 'Yes',
                        value: 'Yes',
                        route_to_label: 'Are you pregnant?',
                    },
                    {
                        label: 'No',
                        value: 'No',
                        route_to_label: 'Are you pregnant?',
                    },
                ],
            },
            {
                label: 'Are you pregnant?',
                type: 'radio',
                placeholder: 'Are you pregnant?',
                is_required: true,
                can_skip: true,
                can_skip_to: [{
                    answer_for_label: 'What is your gender',
                    for_value: 'M',
                    skip_to_label: 'Are you allergic to pencillin?',
                }],
                options: [
                    {
                        label: 'Yes',
                        value: 'Yes',
                        route_to_label: 'Are you allergic to pencillin?',
                    },
                    {
                        label: 'No',
                        value: 'No',
                        route_to_label: 'Are you allergic to pencillin?',
                    },
                ],
            },
            {
                label: 'Are you allergic to pencillin?',
                type: 'radio',
                placeholder: 'Are you allergic to pencillin?',
                is_required: true,
                options: [{
                    label: 'Yes',
                    value: 'Yes',
                    route_to_label: 'Any you having any of the following conditons? (Mark multiple)',
                },
                {
                    label: 'No',
                    value: 'No',
                    route_to_label: 'Any you having any of the following conditons? (Mark multiple)',
                }],
            },
            {
                label: 'Any you having any of the following conditons? (Mark multiple)',
                type: 'search-multiple-select',
                placeholder: 'Any you having any of the following conditons? (Mark multiple)',
                is_required: true,
                options: [
                    {
                        label: 'Diabetes',
                        value: 'diabetes',
                        route_to_label: 'Thank You - we will connect you with a doctor',
                    },
                    {
                        label: 'High BP',
                        value: 'high_bp',
                        route_to_label: 'Thank You - we will connect you with a doctor',
                    },
                    {
                        label: 'Migrane',
                        value: 'migrane',
                        route_to_label: 'Thank You - we will connect you with a doctor',
                    },
                    {
                        label: 'Flu',
                        value: 'flu',
                        route_to_label: 'Thank You - we will connect you with a doctor',
                    },
                    {
                        label: 'None of the above',
                        value: 'na',
                        route_to_label: 'Thank You - we will connect you with a doctor',
                    },
                ],
            },
            {
                label: 'Thank You - we will connect you with a doctor',
                type: 'button',
            },
        ];
    },
};
