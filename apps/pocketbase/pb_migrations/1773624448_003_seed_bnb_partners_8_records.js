/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("bnb_partners");

  const record0 = new Record(collection);
    record0.set("name", "Casa Etna View");
    record0.set("city", "Catania");
    record0.set("priceRange", "\u20ac80-120/night");
    record0.set("amenities", ["WiFi", "Kitchen", "AC", "Parking"]);
    record0.set("rating", 4.7);
    record0.set("externalUrl", "https://example.com/casa-etna");
    record0.set("active", true);
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record1 = new Record(collection);
    record1.set("name", "Centro Storico Loft");
    record1.set("city", "Catania");
    record1.set("priceRange", "\u20ac60-90/night");
    record1.set("amenities", ["WiFi", "AC", "Breakfast"]);
    record1.set("rating", 4.5);
    record1.set("externalUrl", "https://example.com/centro-storico");
    record1.set("active", true);
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record2 = new Record(collection);
    record2.set("name", "Mondello Beach House");
    record2.set("city", "Palermo");
    record2.set("priceRange", "\u20ac100-150/night");
    record2.set("amenities", ["WiFi", "Pool", "Kitchen", "Parking"]);
    record2.set("rating", 4.8);
    record2.set("externalUrl", "https://example.com/mondello");
    record2.set("active", true);
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record3 = new Record(collection);
    record3.set("name", "Vucciria Market Apartment");
    record3.set("city", "Palermo");
    record3.set("priceRange", "\u20ac50-80/night");
    record3.set("amenities", ["WiFi", "AC", "Kitchen"]);
    record3.set("rating", 4.4);
    record3.set("externalUrl", "https://example.com/vucciria");
    record3.set("active", true);
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record4 = new Record(collection);
    record4.set("name", "Taormina Terrace");
    record4.set("city", "Taormina");
    record4.set("priceRange", "\u20ac120-180/night");
    record4.set("amenities", ["WiFi", "Pool", "Kitchen", "AC", "Breakfast"]);
    record4.set("rating", 4.9);
    record4.set("externalUrl", "https://example.com/taormina-terrace");
    record4.set("active", true);
  try {
    app.save(record4);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record5 = new Record(collection);
    record5.set("name", "Ortygia Seaside");
    record5.set("city", "Syracuse");
    record5.set("priceRange", "\u20ac90-130/night");
    record5.set("amenities", ["WiFi", "Pool", "Kitchen", "AC"]);
    record5.set("rating", 4.6);
    record5.set("externalUrl", "https://example.com/ortygia");
    record5.set("active", true);
  try {
    app.save(record5);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record6 = new Record(collection);
    record6.set("name", "Ragusa Historic");
    record6.set("city", "Ragusa");
    record6.set("priceRange", "\u20ac70-100/night");
    record6.set("amenities", ["WiFi", "Kitchen", "AC", "Breakfast"]);
    record6.set("rating", 4.5);
    record6.set("externalUrl", "https://example.com/ragusa-historic");
    record6.set("active", true);
  try {
    app.save(record6);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record7 = new Record(collection);
    record7.set("name", "Valley of Temples View");
    record7.set("city", "Agrigento");
    record7.set("priceRange", "\u20ac75-110/night");
    record7.set("amenities", ["WiFi", "Kitchen", "AC", "Parking"]);
    record7.set("rating", 4.7);
    record7.set("externalUrl", "https://example.com/valley-temples");
    record7.set("active", true);
  try {
    app.save(record7);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})
