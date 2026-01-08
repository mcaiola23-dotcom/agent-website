import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'lead',
    title: 'Lead',
    type: 'document',
    fields: [
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            readOnly: true,
        }),
        defineField({
            name: 'source',
            title: 'Source',
            type: 'string',
            options: {
                list: [
                    { title: 'Home Value Estimate', value: 'home-value' },
                    { title: 'Contact Form', value: 'contact' },
                    { title: 'Unknown', value: 'unknown' },
                ],
            },
            initialValue: 'unknown',
        }),
        defineField({
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'string',
        }),
        defineField({
            name: 'propertyType',
            title: 'Property Type',
            type: 'string',
        }),
        defineField({
            name: 'beds',
            title: 'Beds',
            type: 'number',
        }),
        defineField({
            name: 'baths',
            title: 'Baths',
            type: 'number',
        }),
        defineField({
            name: 'sqft',
            title: 'Sqft',
            type: 'number',
        }),
        defineField({
            name: 'timeframe',
            title: 'Timeframe',
            type: 'string',
        }),
        defineField({
            name: 'notes',
            title: 'Notes',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'consentToContact',
            title: 'Consent to Contact',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'ip',
            title: 'IP Address',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'userAgent',
            title: 'User Agent',
            type: 'string',
            readOnly: true,
        }),
    ],
    preview: {
        select: {
            title: 'email',
            subtitle: 'address',
            date: 'createdAt',
        },
        prepare({ title, subtitle, date }) {
            return {
                title: title || 'No Email',
                subtitle: `${new Date(date).toLocaleDateString()} - ${subtitle || 'No Address'}`,
            }
        },
    },
})
