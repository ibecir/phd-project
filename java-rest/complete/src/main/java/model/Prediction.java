package model;

public class Prediction {

    private final long id;
    private final String content;

    public Prediction(long id, String content) {
        this.id = id;
        this.content = content;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }
}
