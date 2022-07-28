// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const nodeExternals = require('webpack-node-externals');
const axios = require('axios');

module.exports = function (api) {
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          allowlist: [/^vuetify/]
        })
      ])
    }
  })
  
  api.loadSource(async actions => {
    // const {data} = await axios.get('http://localhost:1337/api/events?populate[0]=image&populate[1]=categories')
    const {data} = await axios.get('https://floating-bastion-34801.herokuapp.com/api/events?populate[0]=image&populate[1]=categories')

    const collection = actions.addCollection({
      typeName: 'Event',
      path: '/events/:id'
    })

    const events = data.data;
    
    for (const event of events) {
      const img_data = event.attributes.image.data.attributes.formats;
      const cat_data = event.attributes.categories.data[0];
      collection.addNode({
        id: event.id,
        path: '/events/' + event.id,
        title: event.attributes.title,
        description: event.attributes.description,
        price: event.attributes.price,
        date: event.attributes.date,
        duration: event.attributes.duration,
        thumbnail: img_data.thumbnail.url,
        image: img_data.medium.url,
        category: cat_data.id
      })
    }
  })

}
