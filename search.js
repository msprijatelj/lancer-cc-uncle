const data = require('./data');
const lunr = require('lunr')

const { weapons, systems, mods, frames, tags, talents } = data


// const traits = frames.flatMap(frame => frame.traits.map(trait => ({
//   id: `trait_${trait.name.replace(/ /g, '_').toLowerCase()}`,
//   name: trait.name,
//   effect: trait.description,
//   data_type: 'trait'
// })))

const searchable = [
  ...weapons.map(w => ({ ...w, 'data_type': 'weapon' })), ...systems, ...mods, ...frames,
  ...talents.map(t => ({ ...t, 'data_type': 'talent' })),
  ...tags.filter(x => !x.filter_ignore).map(t => ({ ...t, 'data_type': 'tag' })),
]

const index = lunr(function () {
  this.ref('id')
  this.field('name')

  searchable.forEach(x => this.add(x))

})

module.exports = {
  search(term) {
    return index.search(term)
  },
  getDetails(id) {
    return searchable.find(x => x.id === id)
  }
}