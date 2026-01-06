import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'town',
    title: 'Town',
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
            name: 'overviewShort',
            title: 'Short Overview',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'overviewLong',
            title: 'Long Overview',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'lifestyle',
            title: 'Lifestyle',
            type: 'text',
        }),
        defineField({
            name: 'marketNotes',
            title: 'Market Notes',
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
