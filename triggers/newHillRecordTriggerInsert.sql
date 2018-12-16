CREATE TRIGGER newHillRecordTriggerInsert
AFTER INSERT ON `series-results` for each row
begin
	call newHillRecord(new.competition_id,new.distance);
END