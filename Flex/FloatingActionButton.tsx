
import React , { useEffect, useState }  from "react";
import { View, StyleSheet } from "react-native";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const FloatingActionButton:React.FC<any> = () => {
    return(
        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => {}}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
}

const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
});

export default FloatingActionButton;