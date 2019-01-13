package controllers;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.ModelAttribute;
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

    @RequestMapping("/prediction/car")
    public Prediction car(@RequestParam(value="name", defaultValue="World") String name) throws Exception {
    	String instance = "ford,escort model,Polovan,Dizel,l7,0-45,Manuelni,l5,braon,three,2 x 2,no,no,no,no,no,no,no,no,no,no,no,no,no,no,no,no,NaN";
    	String prediction = Utils.mainMethod(instance);

        return new Prediction(counter.incrementAndGet(), String.format(template, prediction));
    }
    
    @RequestMapping(value = "/car", method = RequestMethod.POST)
    public Prediction carPrice(@ModelAttribute("car") String car) throws Exception {
    	String prediction = Utils.mainMethod(car);
        return new Prediction(counter.incrementAndGet(), prediction);
    }
}
