CREATE TRIGGER newSkiJumperRecordTriggerUpdate
AFTER UPDATE ON `series-results` for each row
begin
	call newSkiJumperRecord(new.person_id,new.distance);
END