package com.example.demo;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;


public class File{
	public File() {
	}
	
	public void Write(String string){
		try {
			FileWriter file = new FileWriter("HistoricoChat.txt",true);
			try(BufferedWriter buffer = new BufferedWriter(file)){
				buffer.write(string);
				buffer.newLine();
				buffer.close();
			}
			file.close();
		}catch(Exception ex){
			System.out.print("Error a la hora de escribir");	
		}
		
		
	}
	
	public List<String> Read() {
		List <String> data = new ArrayList<String>();
		try {
			FileReader file = new FileReader("HistorialChat.txt");
			try(BufferedReader lectura = new BufferedReader(file)){
				String strng;
				while((strng = lectura.readLine()) != null) {
					data.add(strng);
				}
			}
		}catch(Exception ex) {
			System.out.print("Error a la hora de leer");
		}
		return data;
	}
}
