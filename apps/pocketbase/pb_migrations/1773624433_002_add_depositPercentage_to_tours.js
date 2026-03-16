/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("tours");

  const existing = collection.fields.getByName("depositPercentage");
  if (existing) {
    if (existing.type === "number") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("depositPercentage"); // exists with wrong type, remove first
  }

  collection.fields.add(new NumberField({
    name: "depositPercentage",
    required: false
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("tours");
  collection.fields.removeByName("depositPercentage");
  return app.save(collection);
})
