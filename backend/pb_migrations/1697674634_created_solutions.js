/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "d3hs4xtw6hxpqc4",
    "created": "2023-10-19 00:17:14.660Z",
    "updated": "2023-10-19 00:17:14.660Z",
    "name": "solutions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "eray4ggg",
        "name": "longestWord",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("d3hs4xtw6hxpqc4");

  return dao.deleteCollection(collection);
})
