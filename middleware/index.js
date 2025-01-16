function middlewarefn() {
  return (req, res, next) => {
    console.log("Hello middle ware is here");
    next();
  };
}

module.exports = { middlewarefn };
