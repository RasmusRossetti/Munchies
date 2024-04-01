export default {
  name: 'restaurant',
  type: 'document',
  title: 'Restaurant',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of the Restaurant',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category of restaurant',
    },
    {
      name: 'estimatedTime',
      type: 'string',
      title: 'Estimated Time',
    },
    {
      name: 'price',
      type: 'string',
      title: 'Price',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of the restaurant',
      options: {
        source: 'title',
        maxLength: 200, // Adjust as per your requirement
      },
    },
    {
      name: 'titleImage',
      type: 'image',
      title: 'Title Image',
    },
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Small Description',
    },
    {
      name: 'openOrClosed',
      type: 'string',
      title: 'Open or Closed',
    },
  ],
}
