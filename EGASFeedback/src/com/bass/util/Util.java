package com.bass.util;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;


import javax.xml.soap.SOAPMessage;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


public class Util {
	
	public static String convertStreamToString(InputStream is) {
        // The incoming input stream is accumulated in a String to be returned
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        StringBuilder sb = new StringBuilder();
        String line = null;
        try {
            while ((line = reader.readLine()) != null) {
                sb.append(line).append("\n");
            }
        } catch (IOException e) {
        } finally {
            try {
                is.close();
            } catch (IOException e) {
            }
        }
        return sb.toString();
    }
	
	public static String soapToString(SOAPMessage message) 
    {
        String result = null;

        if (message != null) 
        {
            ByteArrayOutputStream baos = null;
            try 
            {
                baos = new ByteArrayOutputStream();
                message.writeTo(baos); 
                result = baos.toString();
            } 
            catch (Exception e) 
            {
            } 
            finally 
            {
                if (baos != null) 
                {
                    try 
                    {
                        baos.close();
                    } 
                    catch (IOException ioe) 
                    {
                    }
                }
            }
        }
        return result;
    }
	
	public static Properties getConfig()
	{
		InputStream inStream=null;
		Properties prop=null;
		try{
			//URL url = Util.class.getResource("config.properties");
			//URI uri = url.toURI();
			//Path path=Paths.get(uri);
			
			 prop=new Properties();
			 inStream=Util.class.getResourceAsStream("config.properties");
			 //inStream=getClass().getClassLoader().getResourceAsStream("config.properties");
			 //inStream=Util.class.getResourceAsStream("config.properties");
			  //inStream = Files.newInputStream(path, null);
			 if(inStream !=null)
				prop.load(inStream);
			 inStream.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			//throw e;
		}
		finally{
			
		}
		return prop;
	}
	
	public static String readJsonProperty(String key, String json) throws Exception {
		JSONParser parser = new JSONParser();
		Object obj = parser.parse(json);
		JSONObject jsonObj = (JSONObject)obj;
		return jsonObj.get(key).toString();
	}
	
	public static String formatDate(Date date,String format)
	{
		SimpleDateFormat formatter=new SimpleDateFormat(format);
		return formatter.format(date);
	}
}
