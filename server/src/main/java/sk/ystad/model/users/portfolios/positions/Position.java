package sk.ystad.model.users.portfolios.positions;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "position_id")
    private Long positionId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id", nullable = false)
    private AvailablePosition position;


    public Long getPositionId() {
        return positionId;
    }

    public AvailablePosition getPosition() {
        return position;
    }

    private String postionName;

    @Transient
    public String getPostionName() {
        return postionName;
    }
}
