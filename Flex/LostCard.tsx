import React from "react";
import {Button, Card } from "react-native-paper";

interface LostCardProps {
    reset(): void;
}

const LostCard: React.FC<LostCardProps> = ({reset}) =>  {
    return(
        <Card>
            <Card.Title
                style={{backgroundColor:"red"}}
                title="You Lost" 
                subtitle="You could not finish in time" 
                ></Card.Title>
            <Card.Cover source={require('../assets/11-119592_this-free-icons-png-design-of-sad-face.png')} />
            <Card.Actions>
                <Button
                onPress = {() => {reset();}}
                >Play again</Button>
            </Card.Actions>
        </Card>
    );
}

export default LostCard;