function checkGroup(req, res, groups) {
  if (req.query.grupa === undefined) {
    res.status(404).send('No trip group.');
  }

  const group = parseInt(req.query.grupa);
  if (group < 0 || group >= groups) {
    res.status(404).send('Wrong trip group.');
  }

  return group;
}

function checkTripId(req, res) {
  if (req.query.wycieczkaId === undefined) {
    res.status(404).send('No trip ID.');
  }

  const id = parseInt(req.query.wycieczkaId);
  if (id <= 0) {
    res.status(404).send('Wrong trip ID.');
  }

  return id;
}

function parseErrorsToArray(errors) {
  let errorMessages = [];
  let lastWrongParam = '';
  for (const error of errors.sort()) {
    if (error.param.localeCompare(lastWrongParam) != 0) {
      errorMessages.push(error.msg);
      lastWrongParam = error.param;
    }
  }
  return errorMessages;
}

export { checkGroup, checkTripId, parseErrorsToArray };