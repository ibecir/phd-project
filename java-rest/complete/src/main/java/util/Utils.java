package util;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import weka.classifiers.Classifier;
import weka.core.Instance;
import weka.core.Instances;
import weka.core.converters.ArffLoader.ArffReader;

public class Utils {

	public static int mainMethod(String instance) throws Exception {
		appendToCSV("predict_data.arff", instance);
		int clasified = (int) classify("predict_data.arff", "src/main/java/models/ten_year_chd_model.model");
		return clasified;
	}

	public static void appendToCSV(String fileName, String instance) throws IOException {
		FileWriter fw = new FileWriter("src/main/java/data/" + fileName, true);
		fw.write("\n");
		fw.write(instance);
		fw.close();
	}

	public static double classify(String fileName, String modelPath) throws Exception {
		Instances data = getData("src/main/java/data/" + fileName);
		Classifier cls_co = (Classifier) weka.core.SerializationHelper.read(modelPath);
		weka.core.Instance newInst = data.instance(data.numInstances() - 1);
		double pred = cls_co.classifyInstance(newInst);
		return pred;
	}

	public static Instances getData(String fileName) throws IOException {
		BufferedReader reader = new BufferedReader(new FileReader(fileName));
		ArffReader arff = new ArffReader(reader, 1000);
		Instances data = arff.getStructure();
		data.setClassIndex(data.numAttributes() - 1);
		Instance inst;
		while ((inst = arff.readInstance(data)) != null) {
			data.add(inst);
		}
		return data;
	}
}
