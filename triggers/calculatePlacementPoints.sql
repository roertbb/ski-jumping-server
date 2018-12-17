create procedure calculatePlacementPoints(IN prsnid INTEGER, IN cmptid INTEGER)
begin
  declare series_points float;
  
  SELECT SUM(style_points+distance_points+gate_points+wind_points) into series_points
  FROM `series-results`
  WHERE person_id=prsnid AND competition_id=cmptid;

  update `placements` set points = series_points where person_id=prsnid AND competition_id=cmptid;

  CALL updatePlacement(cmptid);
  -- CALL updateClassification();
end