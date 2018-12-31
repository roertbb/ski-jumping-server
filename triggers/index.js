exports.files = [
  './newHillRecord.sql',
  './newHillRecordTriggerInsert.sql',
  './newHillRecordTriggerUpdate.sql',
  './newSkiJumperRecord.sql',
  './newSkiJumperRecordTriggerInsert.sql',
  './newSkiJumperRecordTriggerUpdate.sql',
  './calculatePlacementPoints.sql',
  './calculatePlacementPointsInsert.sql',
  './calculatePlacementPointsUpdate.sql',
  './updatePlacement.sql',
  './updateClassification.sql',
  './updateTeamComp.sql',
  './updateTeamClassification.sql',
  './calcBMI.sql'
];
exports.triggerNames = [
  'newHillRecordTriggerUpdate',
  'newHillRecordTriggerInsert',
  'newSkiJumperRecordInsert',
  'newSkiJumperRecordUpdate',
  'calculatePlacementPointsInsert',
  'calculatePlacementPointsUpdate'
];
exports.procedureNames = [
  'newHillRecord',
  'newSkiJumperRecord',
  'updatePlacement',
  'calculatePlacementPoints',
  'updateResultForTeam',
  'updateClassification',
  'updateTeamClassification'
];
exports.functionNames = ['calcBMI'];
