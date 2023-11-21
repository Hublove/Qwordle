/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d3hs4xtw6hxpqc4")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d3hs4xtw6hxpqc4")

  collection.listRule = null

  return dao.saveCollection(collection)
})
