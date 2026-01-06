import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'neighborhood',
    title: 'Neighborhood',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'town',
            title: 'Town',
            type: 'reference',
            to: { type: 'town' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'overview',
            title: 'Overview',
            type: 'text',
        }),
        defineField({
            name: 'housingCharacteristics',
            title: 'Housing Characteristics',
            type: 'text',
        }),
        defineField({
            name: 'marketNotes',
            title: 'Market Notes',
            type: 'text',
        }),
        defineField({
            name: 'locationAccess',
            title: 'Location & Access',
            type: 'text',
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'faq' } }],
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'videoEmbedUrl',
            title: 'Video Embed URL',
            type: 'url',
        }),
        defineField({
            name: 'lastReviewedAt',
            title: 'Last Reviewed At',
            type: 'datetime',
        }),
    ],
})
