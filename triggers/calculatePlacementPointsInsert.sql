CREATE TRIGGER calculatePlacementPointsInsert
AFTER INSERT ON `series-results` for each row
begin
  call calculatePlacementPoints(new.person_id, new.competition_id);
END
