create procedure calculatePlacementPoints(IN person_id INTEGER, IN competition_id INTEGER)
begin
  declare series_points float;
  
  SELECT SUM(style_points+distance_points+gate_points+wind_points) into series_points
  FROM `series-results`
  WHERE person_id=new.person_id AND competition_id=new.competition_id;

  update `placements` set points = series_points where person_id=new.person_id AND competition_id=new.competition_id;

  CALL updatePlacement(new.competition_id);
  CALL updateClassification();
end