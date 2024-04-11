/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "o35hiww95dicpw9",
    "created": "2024-04-11 00:34:23.089Z",
    "updated": "2024-04-11 00:34:23.089Z",
    "name": "Funcoes_Usuarios",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jv0zphsj",
        "name": "Nome",
        "type": "text",
        "required": true,
        "presentable": true,
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
  const collection = dao.findCollectionByNameOrId("o35hiww95dicpw9");

  return dao.deleteCollection(collection);
})
