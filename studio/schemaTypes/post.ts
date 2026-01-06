import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Market Update', value: 'market-update' },
                    { title: 'Community', value: 'community' },
                    { title: 'Real Estate Tips', value: 'tips' },
                    { title: 'News', value: 'news' },
                ],
            },
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'updatedAt',
            title: 'Updated at',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' }
            ],
        }),
        defineField({
            name: 'relatedTowns',
            title: 'Related Towns',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'town' } }],
        }),
        defineField({
            name: 'relatedNeighborhoods',
            title: 'Related Neighborhoods',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'neighborhood' } }],
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
    ],
})
