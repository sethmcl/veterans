package models;

import javax.persistence.Entity;
import javax.persistence.Table;

import play.db.jpa.Model;

@Entity
@Table(name="people")
public class People extends Model{
	public People(){
		
	}
	public People(String fullname, String title, String location){
		this.fullname = fullname;
		this.title = title;
		this.location = location;
	}

	private String fullname;
	private String title;
	private String location;

	public String getFullname(){
		return this.fullname;
	}
	public void setFullname(String fullname){
		this.fullname = fullname;
	}

	public String getTitle(){
		return this.title;
	}
	public void setTitle(String title){
		this.title = title;
	}

	public String getLocation(){
		return this.location;
	}
	public void setLocation(String location){
		this.location = location;
	}
}
