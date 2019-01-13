package util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import weka.classifiers.Classifier;
import weka.core.Instances;
import weka.core.converters.CSVLoader;

public class Utils {

	public static String mainMethod(String instance) throws Exception{
		appendToCSV("input_ranges.csv", instance);
		int clasified=(int)classify("input_ranges.csv", "src/main/java/models/Trained_Model_For_Renges.model");
		String prediction = "";

		switch (clasified) {
		case 0: System.out.println("Cheap");
				appendToCSV("cleaned_data_cheap.csv", instance);
				int cheap_class=(int)classify("cleaned_data_cheap.csv", "src/main/java/models/Trained_Model_For_Cheap1.model");
				switch (cheap_class) {
				case 0:
					prediction = "0 - 1500";
					break;
				case 1:
					prediction = "1500 - 3000";
					break;
				case 2:
					prediction = "3000 - 4500";
					break;
				case 3:
					prediction = "4500 - 6000";
					break;
				case 4:
					prediction = "6000 - 7500";
					break;
				case 5:
					prediction = "7500 - 9000";
					break;
				case 6:
					prediction = "9000 - 10500";
					break;
				case 7:
					prediction = "10500 - 12000";
					break;
				}
			break;
		case 1: System.out.println("Moderate");
				appendToCSV("cleaned_data_moderate.csv", instance);
				int moderate_class=(int)classify("cleaned_data_moderate.csv", "src/main/java/models/Trained_Model_For_Moderate_ANN.model");
				switch (moderate_class) {
				case 0:
					prediction = "12000 - 15000";
					break;
				case 1:
					prediction = "15000 - 18000";
					break;
				case 2:
					prediction = "18000 - 21000";
					break;
				case 3:
					prediction = "21000 - 24000";
					break;
				}
			break;
		case 2: System.out.println("Expencive");
				appendToCSV("cleaned_data_expencive.csv", instance);
				int expensive_class=(int)classify("cleaned_data_expencive.csv", "src/main/java/models/Trained_Model_For_Expencive.model");
				switch (expensive_class) {
				case 0:
					prediction = "24000 - 28000";
					break;
				case 1:
					prediction = "28000 - 32000";
					break;
				case 2:
					prediction = "32000 - 36000";
					break;
				case 3:
					prediction = "36000 - ...";
					break;
				}
		 	break;
		}
		return prediction;
	}

	public static void appendToCSV(String fileName,String instance) throws IOException{
		FileWriter fw = new FileWriter("src/main/java/data/" + fileName, true);
		fw.write("\n");
		fw.write(instance);
		fw.close();
	}

	public static double classify(String fileName,String modelPath) throws Exception{
		Instances data=getData("src/main/java/data/" + fileName);
		Classifier cls_co = (Classifier) weka.core.SerializationHelper
                .read(modelPath);
		weka.core.Instance newInst=data.instance(data.numInstances()-1);
		double pred=cls_co.classifyInstance(newInst);
		return pred;
	}

	public static Instances getData(String fileName) throws IOException{
		CSVLoader loader = new CSVLoader();
	    loader.setSource(new File(fileName));
	    Instances data = loader.getDataSet();
	    data.setClassIndex(data.numAttributes()-1);
	    return data;
	}
}
