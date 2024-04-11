/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "pnb5sdyfgcoj0w9",
    "created": "2024-04-11 00:44:38.516Z",
    "updated": "2024-04-11 00:44:38.516Z",
    "name": "maquinas",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kbrjbrer",
        "name": "nome_maquina",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "t3wtsif2",
        "name": "endereco_ip",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "w9kue2lk",
        "name": "status_maquina",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("pnb5sdyfgcoj0w9");

  return dao.deleteCollection(collection);
})
