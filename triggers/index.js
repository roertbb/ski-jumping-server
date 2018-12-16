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
  './insertResultForTeam.sql'
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
  'updateClassification',
  'calculatePlacementPoints'
];
