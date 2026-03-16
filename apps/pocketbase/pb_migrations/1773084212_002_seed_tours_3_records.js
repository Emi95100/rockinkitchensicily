/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("tours");

  const record0 = new Record(collection);
    record0.set("tourName", "Catania Morning - Market tour");
    record0.set("description", "Explore the vibrant markets of Catania in the morning");
    record0.set("location", "Catania");
    record0.set("startTime", "10:00");
    record0.set("endTime", "13:30");
    record0.set("price", 60);
    record0.set("depositAmount", 20);
    record0.set("maxParticipants", 15);
    record0.set("meetingPoint", "Piazza Duomo");
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
    record1.set("tourName", "Catania Evening - Horse meat and pizza");
    record1.set("description", "Experience authentic Catanian cuisine with horse meat and traditional pizza");
    record1.set("location", "Catania");
    record1.set("startTime", "18:00");
    record1.set("endTime", "21:00");
    record1.set("price", 60);
    record1.set("minParticipants", 2);
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
    record2.set("tourName", "Palermo - Market walking tour");
    record2.set("description", "Walking tour through the famous markets of Palermo");
    record2.set("location", "Palermo");
    record2.set("startTime", "10:00");
    record2.set("endTime", "13:00");
    record2.set("price", 70);
    record2.set("depositAmount", 30);
    record2.set("meetingPoint", "Mercato del Capo");
  try {
    app.save(record2);
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