CREATE TRIGGER newSkiJumperRecordTriggerInsert 
AFTER INSERT ON `series-results` for each row
begin
	call newSkiJumperRecord(new.person_id,new.distance);
END