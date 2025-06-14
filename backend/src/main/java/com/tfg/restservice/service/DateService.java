package com.tfg.restservice.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.stereotype.Service;

@Service
public class DateService {

	public java.sql.Date fromStringToSQLDate(String date) throws ParseException {

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date utilDate = dateFormat.parse(date);
		return new java.sql.Date(utilDate.getTime());

	}
}