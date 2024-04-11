/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o35hiww95dicpw9")

  collection.name = "funcoes_usuarios"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o35hiww95dicpw9")

  collection.name = "Funcoes_Usuarios"

  return dao.saveCollection(collection)
})
