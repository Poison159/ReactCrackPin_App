import React from "react";
import {Button, Card, Text } from "react-native-paper";

interface WonCardProps {
    timeToSpare:number,
    reset(): void,
}

const WonCard: React.FC<WonCardProps> = ({reset,timeToSpare}) =>  {
    return(
        <Card>
            <Card.Title style={{backgroundColor:"green"}} title="You Won" subtitle="You're a genius"></Card.Title>
            <Card.Cover source={require('../assets/d59c9002030448f1193adf7d7600a52a.png')} />
            <Text style={{textAlign: 'center'}}>With {timeToSpare} seconds to spare!</Text>
            <Card.Actions>
            <Button
                onPress = {() => {reset();}}
            >Play again</Button>
            </Card.Actions>
        </Card>
    );
}

export default WonCard;