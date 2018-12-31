CREATE FUNCTION calcBMI(skijumperid INT) RETURNS float READS SQL DATA
BEGIN
  declare h float;
  declare w float;

  select height, weight into h, w from `ski-jumpers` where person_id = skijumperid;

  return round(w/((h/100)*(h/100)),2);
END;