package controllers;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import model.Prediction;
import util.Utils;

@RestController
public class PredictionController {

    private static final String template = "%s";
    private final AtomicLong counter = new AtomicLong();
    BufferedReader buffer_reader = null;
    String line = "";
    int correctly_classified = 0;
    int incorrectly_classified = 0;
    
    @RequestMapping("/prediction/accuracy")
    public Prediction car(@RequestParam(value="name", defaultValue="World") String name) throws Exception {
    	buffer_reader = new BufferedReader(new FileReader("src/main/java/data/test_data.csv"));
    	while((line = buffer_reader.readLine()) != null){
    		String actual_class = line.substring(line.lastIndexOf(',') + 1);
    		line = line.substring(0, line.length() - 1) + "NaN";
    		int prediction = Utils.mainMethod(line);
    		
    		if(Integer.parseInt(actual_class) == prediction){
    			correctly_classified++;
    		}else{
    			incorrectly_classified++;
    		}
    		System.out.println("ACTUAL value is " + actual_class + " PREDICTED value is " + prediction);
        }
    	System.out.println("CORRECT " + correctly_classified + " ####### INCORRECT " + incorrectly_classified);
    	
        return new Prediction(counter.incrementAndGet(), String.format(template, 1));
    }
    
    @RequestMapping("/predict")
    public Prediction predict(@RequestParam(value="instance", defaultValue="") String instance) throws Exception {
    	int prediction = Utils.mainMethod(instance);
    	System.out.println(instance);
        return new Prediction(counter.incrementAndGet(), String.format(template, prediction));
    }
}
