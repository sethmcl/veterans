package models;

public class JSONData {
	public JSONData(){

	}
	public JSONData(int id, People person){
		this.id = id;
		this.data = person;
	}
//	public JSONData(int id, String name, String title, String location) {
//		this.id = id;
//		this.name = name;
//		this.title = title;
//		this.location = location;
//	}
//
//	private int id;
//	private String name;
//	private String title;
//	private String location;
	private int id;
	private People data;
}
