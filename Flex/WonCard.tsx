import React, { useEffect, useState } from "react";
import { Button, Card, Text } from "react-native-paper";
import { useStore } from "../store/store";

interface WonCardProps {
    reset(): void,
}

const WonCard: React.FC<WonCardProps> = ({ reset }) => {
    const { pinStore: { timeToSpare } } = useStore();
    const [funFact, setFunFacts] = useState([]);
    const subtitle = "Won with " + timeToSpare + "to spare";
    useEffect(() => {
        const fetchFact = async () => {
            try {
                const res = await fetch('https://api.api-ninjas.com/v1/jokes?limit=' + 1,
                    {
                        headers: {
                            'X-Api-Key': 'OrtxEzlVaDcKBYmzDt9yDg==XLK8RkA16JXR2v2u'
                        }
                    });
                const Jsonres = await res.json();
                console.log(Jsonres);
                setFunFacts(Jsonres);
            } catch (err: any) {
                console.log(err.message);
            }
        }
        fetchFact();
    },[])

    return (
        <Card>
            <Card.Title style={{ backgroundColor: "green" }} title="You Won" subtitle={subtitle}></Card.Title>
            <Card.Cover source={require('../assets/d59c9002030448f1193adf7d7600a52a.png')} />
            <Text style={{ textAlign: 'center' }}></Text>
            {
                funFact.map((ff:any) => (
                    <Card>
                        <Text style={{fontWeight:"bold",textAlign:"center"}}>{ff.joke}</Text>
                    </Card>
                ))
            }
            <Card.Actions>
                <Button
                    onPress={() => { reset(); }}
                >Play again</Button>
            </Card.Actions>
        </Card>
    );
}

export default WonCard;