import { db, auth } from "../services/firebase";

function DatabaseConnection() {
  let databaseInstance = null;

  // tracks the number of instances created at a certain time
  let count = 0;

  function init() {
    console.log(`Opening database #${count + 1}`);
    //now perform operation
  }
  function createIntance() {
    if (databaseInstance == null) {
      databaseInstance = init();
    }
    return databaseInstance;
  }
  function closeIntance() {
    console.log("closing database");
    databaseInstance = null;
  }
  return {
    open: createIntance,
    close: closeIntance,
  };
}
