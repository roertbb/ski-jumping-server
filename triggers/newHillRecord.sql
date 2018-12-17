create procedure newHillRecord(IN compid INTEGER, IN distance FLOAT)
BEGIN
  declare hillid int;
	select ski_jumping_hill_id INTO @hillid from `ski-jumping-hills` join  `competitions` using(ski_jumping_hill_id) where competition_id = compid;
	IF (distance>(SELECT MAX(coalesce(record,0)) FROM `ski-jumping-hills` where ski_jumping_hill_id = @hillid)) THEN
		UPDATE `ski-jumping-hills` SET record=distance where ski_jumping_hill_id = @hillid;
	END IF;
END;