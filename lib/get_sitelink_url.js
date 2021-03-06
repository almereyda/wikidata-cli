const breq = require('bluereq')
const wdk = require('wikidata-sdk')

module.exports = function getSitelinkUrl (id, lang, sitelinkSuffix) {
  if (id[0] === 'P') {
    console.error("Wikidata properties don't have sitelinks")
    process.exit(1)
  }

  const url = wdk.getEntities(id, null, 'sitelinks')

  return breq.get(url)
  .get('body')
  .then((res) => {
    if (res.error) {
      console.error(res.error.info)
      process.exit(1)
    } else {
      const title = res.entities[id].sitelinks[`${lang}${sitelinkSuffix}`].title
      return `https://${lang}.${sitelinkDomain[sitelinkSuffix]}/wiki/${title}`
    }
  })
}

const sitelinkDomain = {
  wiki: 'wikipedia.org'
}
