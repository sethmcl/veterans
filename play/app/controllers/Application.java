package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Controller {

	public static void index() {
		List<People> people = People.findAll();
		render(people);
	}

	public static void people(){
		List<People> people = People.findAll();

		List<Object> peopleList = new ArrayList<Object>();

		for(People person: people){
			peopleList.add(new JSONData(person.id.intValue(), person));
		}

		renderJSON(peopleList);
	}
}